import type { PresetProps } from "@/lib/site-pages";
import SalonSite from "../salon/SalonSite";
import { PETS_DESIGNS } from "./designs";

// Pets sector (vet, grooming, boarding, walking, training, pet shop). A bespoke
// design takes over when content.design is set; otherwise the generic bookings
// layout (SalonSite) renders.
export default function PetsSite(props: PresetProps) {
  const key = props.site.content.design;
  const Design = key ? PETS_DESIGNS[key] : undefined;
  if (Design) return <Design {...props} />;
  return <SalonSite {...props} />;
}
