"use client";
import React, {useEffect} from "react";
import ThreeBlobs from "../ThreeBlobs";

export function Hero() {
    // Add mouse movement handler for the cursor
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
        <section className="relative min-h-screen w-full overflow-hidden cursor-none"
                 style={{backgroundColor: '#dde5f8'}}>
            {/* Three.js Background */}
            <ThreeBlobs/>

            {/* Blurry overlay between blobs and content */}
            <div className="absolute inset-0 z-15 pointer-events-none" style={{
                backdropFilter: 'blur(50px)',
                WebkitBackdropFilter: 'blur(50px)',
                background: 'rgba(255,255,255,0.10)'
            }}>
                {/* Grain overlay */}
                <div className="absolute inset-0 w-full h-full" style={{
                    backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'><filter id=\'noise\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.5\' numOctaves=\'1\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23noise)\'/></svg>")',
                    opacity: 0.25,
                    pointerEvents: 'none',
                    zIndex: 1
                }}/>
            </div>

            {/* Content Overlay with slightly increased z-index to ensure visibility over blurred blobs */}
            <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">
                <div className="max-w-4xl mx-auto pointer-events-none select-none">
                    {/* Logo */}
                    <img
                        src="/Logo_Oscuro.svg"
                        alt="Logo"
                        className="filter drop-shadow-md"
                    />

                    {/* Subtitle */}
                    <p className="font-montserrat font-400 text-lg md:text-xl lg:text-2xl text-javeriana-dark/80 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow">
                        ¡Hola! somos ACM Javeriana, un grupo de estudiantes apasionados por la tecnología y la
                        innovación.
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-10 border-2 border-javeriana-medium/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-javeriana-medium rounded-full mt-2 animate-bounce"></div>
                    </div>
                </div>
            </div>

            {/* Enhanced gradient overlay for depth */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/25 pointer-events-none z-10"></div>

            {/* Custom cursor with higher z-index to ensure it's always on top */}
            <div
                className="fixed rounded-full w-6 h-6 border-2 border-javeriana-medium/50 pointer-events-none"
                style={{
                    left: 0,
                    top: 0,
                    transform: 'translate(-50%, -50%)',
                    transition: 'transform 0.05s ease',
                    zIndex: 999 // Very high z-index to stay above all other elements
                }}
                id="custom-cursor"
            />
        </section>
    );
}
