import TransitionLink from "../components/TransitionLink";

export default function About() {
    return (
        <main className="w-full min-h-screen bg-[#0A0F0C] flex flex-col items-center justify-center font-mono">
            <div className="z-10 text-center">
                <h1 className="text-4xl text-[#D5E2D9] tracking-widest uppercase mb-8">
                    Sys.Corp Data Logs
                </h1>
                <p className="text-[#84A990] max-w-md mx-auto mb-12">
                    This sector is off-limits. Authorized personnel only. Return to the primary sector immediately.
                </p>

                <TransitionLink
                    href="/"
                    className="px-6 py-3 border border-[#84A990]/50 text-[#84A990] hover:bg-[#84A990]/10 transition-colors uppercase tracking-widest text-sm inline-block"
                >
                    [ Return Home ]
                </TransitionLink>
            </div>

            {/* Background styling for testing layout */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-size-[100%_4px,3px_100%] pointer-events-none opacity-50" />
        </main>
    );
}
