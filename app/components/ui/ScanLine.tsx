export function ScanLine() {
    return (
        <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, #fff 2px)`,
                backgroundSize: '100% 4px'
            }}
        />
    );
}