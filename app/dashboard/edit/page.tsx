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
  saveHours,
  saveOrderingLinks,
  saveSocials,
  teamDelete,
  teamSave,
} from "../actions";

export const dynamic = "force-dynamic";

const actions: EditorActions = {
  saveBasics,
  saveContent,
  saveHours,
  saveSocials,
  saveOrderingLinks,
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
        <Link href="/dashboard" className="text-sm text-ink/55 hover:text-ink">← Overview</Link>
      </div>
      <SiteEditor site={site} actions={actions} />
    </div>
  );
}
