import { getApplicationById } from "@/app/actions/applications";
import { notFound } from "next/navigation";
import DetailClient from "./DetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminDetailPage({ params }: PageProps) {
  const { id } = await params;
  const app = await getApplicationById(id);

  if (!app) {
    notFound();
  }

  return <DetailClient app={app} />;
}
