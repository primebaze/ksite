import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyUser } from "@/lib/my-site";
import { ChangePassword } from "@/components/ChangePassword";

export const dynamic = "force-dynamic";

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ changed?: string; error?: string }> }) {
  const { changed, error } = await searchParams;
  const user = await getMyUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Account</h1>
        <Link href="/dashboard" className="text-sm text-ink/50 hover:text-ink">← Home</Link>
      </div>
      <p className="mt-1 text-sm text-ink/45">Signed in as {user.email}</p>

      <div className="mt-6">
        <ChangePassword redirectTo="/dashboard/account" changed={changed === "1"} error={error} />
      </div>
    </div>
  );
}
