import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers";

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

// TODO: scroll component
// TODO: edit job
// TODO: sorting, pagination in manage applicant page
// TODO: notification
// TODO: email to applicant
// TODO: logic max candidate when applicant apply
// TODO: add dropdown currency
// TODO: responsive
// TODO: supabase schema
/*
Enhancement
1. Indicator ketika take picture
2. Search di candidate page
3. Menggunakan supabase
4. Menggunakan react query
5. Menggunakan shadcn
*/
export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${nunitoSans.variable} antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
