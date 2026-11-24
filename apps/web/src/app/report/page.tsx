import type { Metadata } from "next";

import { ReportView } from "@/components/report-view";

export const metadata: Metadata = {
  title: "Analysis report: APKInspector",
  description: "APKInspector static Android application security report.",
};

export default function ReportPage() {
  return <ReportView />;
}
