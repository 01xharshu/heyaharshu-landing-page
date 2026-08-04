import { redirect } from "next/navigation";

export default function LegacyOpenerPage() {
  redirect("/portfolio/builder/apps/opener?view=classic");
}
