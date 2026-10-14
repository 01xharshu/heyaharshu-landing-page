import type { Metadata } from "next";
import TwitterGallery from "@/components/TwitterGallery";

export const metadata: Metadata = {
  title: "Gallery | Harsh",
  description: "A visual journal of images shared by @heyaharshu on X.",
};

export default function Gallery() {
  return <TwitterGallery />;
}
