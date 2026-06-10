import type { PresetProps } from "@/lib/site-pages";
import SalonSite from "../salon/SalonSite";
import { getEducationDesign } from "./designs";

// Education sector (tutors, nurseries, driving/music/language/dance schools). A
// bespoke design takes over when content.design is set; otherwise the generic
// bookings layout (SalonSite) renders.
export default function EducationSite(props: PresetProps) {
  const Design = getEducationDesign(props.site.content.design);
  if (Design) return <Design {...props} />;
  return <SalonSite {...props} />;
}
