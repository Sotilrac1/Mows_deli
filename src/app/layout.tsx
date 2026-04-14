import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: "Mow's Deli",
  description: 'New York deli and fine grocery in Toulouse',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
