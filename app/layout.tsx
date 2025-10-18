import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "Hiring Management",
  description: "Hiring Management Web App",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${nunitoSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
