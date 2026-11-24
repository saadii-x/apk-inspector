import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "APKInspector: Explainable Android Security Analysis",
  description:
    "Inspect Android APK permissions, manifests, signatures, and code indicators without installing or executing the app.",
  applicationName: "APKInspector",
  keywords: ["APK", "Android", "static analysis", "security", "malware analysis"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
