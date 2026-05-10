import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="dark scroll-smooth">
       <head>
        <link rel="icon" href="/git.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="bg-background text-on-background antialiased selection:bg-primary-container selection:text-on-primary-container font-sans">{children}</body>
    </html>
  );
}
