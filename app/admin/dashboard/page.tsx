import { getStats } from "@/app/actions/applications";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const stats = await getStats();
  return <AdminDashboardClient stats={stats} />;
}
