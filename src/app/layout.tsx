import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recursion Visualizer",
  description: "A Recursion Visualizer Tool for C++",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <link rel="icon" href="/node2.png" />
      </head>
      <body className={`${montserrat.className} bg-gray-200`}>{children}</body>
    </html>
  );
}
