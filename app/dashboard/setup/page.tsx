import { redirect } from "next/navigation";
import { FIRST_STEP } from "./steps";

export default function SetupIndex() {
  redirect(`/dashboard/setup/${FIRST_STEP}`);
}
