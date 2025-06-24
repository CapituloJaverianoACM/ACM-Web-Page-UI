'use client';

import MainNavbar from '@/components/main-navbar';
import '../styles/globals.css';
import {HeroUIProvider} from "@heroui/react";
import React, {useEffect} from "react";

export default function RootLayout({children}: { children: React.ReactNode }) {

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const cursor = document.getElementById('custom-cursor');
            if (cursor) {
                cursor.style.left = `${event.clientX}px`;
                cursor.style.top = `${event.clientY}px`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <html lang="es" style={{scrollBehavior: 'smooth'}}>
        <head>
            <title>ACM Capítulo Javeriano</title>
            <meta name="apple-mobile-web-app-title" content="ACM Javeriana" />
        </head>
        <body>
        <HeroUIProvider>
            <MainNavbar/>
            {children}
        </HeroUIProvider>
        {/* Custom cursor with higher z-index to ensure it's always on top */}
        <div
            className="fixed rounded-full w-6 h-6 border-2 border-azul-noche pointer-events-none"
            style={{
                left: 0,
                top: 0,
                transform: 'translate(-50%, -50%)',
                transition: 'transform 0.05s ease',
                zIndex: 999 // Very high z-index to stay above all other elements
            }}
            id="custom-cursor"
        />
        </body>
        </html>
    );
}
