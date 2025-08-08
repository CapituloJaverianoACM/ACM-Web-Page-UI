import { useEffect } from "react";

export const CursorWrapper = ({ children }) => {

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

  return <div className="cursor-none">

    {children}

    {/* Custom cursor with higher z-index to ensure it's always on top */}
    <div
      className="hidden md:flex fixed rounded-full w-6 h-6 border-2 border-azul-noche dark:border-white pointer-events-none"
      style={{
        left: 0,
        top: 0,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.05s ease',
        zIndex: 999 // Very high z-index to stay above all other elements
      }}
      id="custom-cursor"
    />
  </div>
}