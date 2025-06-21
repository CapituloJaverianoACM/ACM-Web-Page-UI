'use client';

import MainNavbar from '@/components/main-navbar';
import '../styles/globals.css';
import { HeroUIProvider } from "@heroui/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <meta name="description" content="Mi App en Next.js" />
        <title>Capitulo Javeriano ACM</title>
      </head>
      <body>
        <HeroUIProvider>
          <MainNavbar />
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
