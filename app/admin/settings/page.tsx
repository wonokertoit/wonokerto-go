import { getSettings, updateSettings } from "@/app/actions/applications";
import { redirect } from "next/navigation";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const settings = await getSettings();

  if (!settings) {
    return <p className="text-center py-8">Settings tidak ditemukan.</p>;
  }

  async function handleUpdate(formData: FormData) {
    'use server';
    await updateSettings(formData);
    redirect('/admin/settings');
  }

  return <SettingsClient settings={settings} updateAction={handleUpdate} />;
}
