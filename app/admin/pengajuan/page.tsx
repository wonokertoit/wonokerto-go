import { getAllApplications } from "@/app/actions/applications";
import PengajuanClient from "./PengajuanClient";

export default async function AdminPengajuanPage() {
  const applications = await getAllApplications();
  return <PengajuanClient applications={applications} />;
}
