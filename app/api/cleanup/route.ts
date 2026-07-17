import { NextRequest, NextResponse } from "next/server";
import { cleanupOldData } from "@/app/lib/cleanup";

export async function GET(request: NextRequest) {
  // Protect endpoint with CRON_SECRET header
  const cronSecret = request.headers.get("x-cron-secret");
  const expectedSecret = process.env.CRON_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 500 }
    );
  }

  if (cronSecret !== expectedSecret) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const result = await cleanupOldData();

    // Build response with CSV data
    const responseData = {
      success: true,
      timestamp: new Date().toISOString(),
      deleted: result.deleted,
      csvAvailable: {
        applications: result.csv.applications.length > 0,
        notifications: result.csv.notifications.length > 0,
        aduan: result.csv.aduan.length > 0,
      },
    };

    // If there are CSV data, include them in response
    if (
      result.csv.applications ||
      result.csv.notifications ||
      result.csv.aduan
    ) {
      return NextResponse.json(
        {
          ...responseData,
          csv: {
            applications: result.csv.applications || null,
            notifications: result.csv.notifications || null,
            aduan: result.csv.aduan || null,
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Cleanup failed:", error);
    return NextResponse.json(
      { error: "Cleanup failed", details: String(error) },
      { status: 500 }
    );
  }
}
