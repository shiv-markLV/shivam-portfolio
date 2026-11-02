import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shivam Yadav — Digital Creator & Software Developer",
  description:
    "Portfolio of Shivam Yadav — B.Tech student, software developer and digital creator. Transforming ideas into meaningful digital experiences.",
  openGraph: {
    title: "Shivam Yadav — Digital Creator & Software Developer",
    description:
      "Portfolio of Shivam Yadav — software engineering, AI and innovative digital products.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${space.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
