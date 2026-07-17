import type { Metadata } from "next";
import LeadDashboard from "../components/LeadDashboard";

export const metadata: Metadata = {
  title: "CSKH | Cổ Thạch",
  robots: { index: false, follow: false },
};

export default function CustomerCarePage() {
  return <LeadDashboard />;
}
