import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deal Readiness Score | M&A Advisory Tool",
  description:
    "A structured M&A readiness assessment for business owners preparing for a transaction. Powered by Christophe El-Hamaoui, Business Lawyer at LRMM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0D0D0D" }}>
        {children}
      </body>
    </html>
  );
}
