import { getApplicationsByUser } from "@/app/actions/applications";
import RiwayatClient from "./RiwayatClient";

export default async function RiwayatPage() {
  const applications = await getApplicationsByUser();
  return <RiwayatClient applications={applications} />;
}
