import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import Navbar from "@/components/layout/navbar";

import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
export const metadata: Metadata = {
  title: "Meaowls - Pet Food & Products",
  description: "Prodotti premium per cani e gatti con consegna a domicilio personalizzata",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "Meaowls", "version": "1.0.0", "greeting": "ciao"}'
        />
        <Navbar />
        {children}
      
        <VisualEditsMessenger />
      </body>
    </html>
  );
}