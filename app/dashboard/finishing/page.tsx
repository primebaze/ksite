import { Assembling } from "@/components/Assembling";

export const dynamic = "force-dynamic";

export default function FinishingPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Assembling />
    </div>
  );
}
