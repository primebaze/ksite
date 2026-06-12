import Link from "next/link";
import { getAdminUser } from "@/lib/supabase-server";
import { ChangePassword } from "@/components/ChangePassword";

export const dynamic = "force-dynamic";

export default async function AdminAccountPage({ searchParams }: { searchParams: Promise<{ changed?: string; error?: string }> }) {
  const { changed, error } = await searchParams;
  const user = await getAdminUser();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Account</h1>
          <p className="mt-1 text-sm text-ink/45">Signed in as {user?.email}</p>
        </div>
        <Link href="/kmanageradmin" className="text-sm text-ink/50 hover:text-ink">← Overview</Link>
      </div>

      <ChangePassword redirectTo="/kmanageradmin/account" changed={changed === "1"} error={error} />
    </div>
  );
}
