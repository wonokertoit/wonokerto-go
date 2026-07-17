import { getAduanByUser } from "@/app/actions/aduan";
import RiwayatAduanClient from "./RiwayatAduanClient";

export default async function RiwayatAduanPage() {
  const aduan = await getAduanByUser();
  return <RiwayatAduanClient aduan={aduan} />;
}
