import type { PresetProps } from "@/lib/site-pages";
import SalonSite from "../salon/SalonSite";
import { getEventsDesign } from "./designs";

// Events & creative sector (photo/video, planners, venues, DJs, hire). A
// bespoke design takes over when content.design is set; otherwise the generic
// bookings layout (SalonSite) renders.
export default function EventsSite(props: PresetProps) {
  const Design = getEventsDesign(props.site.content.design);
  if (Design) return <Design {...props} />;
  return <SalonSite {...props} />;
}
