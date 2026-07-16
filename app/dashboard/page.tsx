import { getStats } from "@/app/actions/applications";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const stats = await getStats();
  return <DashboardClient stats={stats} />;
}
