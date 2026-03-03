"use client";

export default function DystopianBackground({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen overflow-hidden">

            {/* Grid */}
            <div className="absolute inset-0 bg-dot-grid bg-grid opacity-40" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

            <div className="relative z-10">
                {children}
            </div>

        </div>
    );
}