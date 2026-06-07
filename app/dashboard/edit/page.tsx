import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyTenantFull } from "@/lib/my-site";
import { SiteEditor, type EditorActions } from "@/components/SiteEditor";
import {
  catalogDelete,
  catalogSave,
  galleryDelete,
  gallerySave,
  saveBasics,
  saveContent,
  saveContentRaw,
  teamDelete,
  teamSave,
} from "../actions";

export const dynamic = "force-dynamic";

const actions: EditorActions = {
  saveBasics,
  saveContent,
  saveContentRaw,
  catalogSave,
  catalogDelete,
  gallerySave,
  galleryDelete,
  teamSave,
  teamDelete,
};

export default async function EditMySite() {
  const site = await getMyTenantFull();
  if (!site) redirect("/get-started");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit your site</h1>
        <Link href="/dashboard" className="text-sm text-white/55 hover:text-white">← Overview</Link>
      </div>
      <SiteEditor site={site} actions={actions} />
    </div>
  );
}
