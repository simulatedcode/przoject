import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollTimelineConfig {
    trigger: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    onUpdate?: (self: ScrollTrigger) => void;
}

/**
 * Create a GSAP ScrollTrigger instance with sensible defaults.
 * Defers creation by one frame so Lenis + DOM are ready.
 *
 * @returns cleanup function
 */
export function createScrollTimeline(
    config: ScrollTimelineConfig,
): { st: ScrollTrigger | undefined; cleanup: () => void } {
    let st: ScrollTrigger | undefined;

    const rafId = requestAnimationFrame(() => {
        st = ScrollTrigger.create({
            trigger: config.trigger,
            start: config.start ?? "top top",
            end: config.end ?? "bottom bottom",
            scrub: config.scrub ?? true,
            onUpdate: config.onUpdate,
        });
        ScrollTrigger.refresh();
    });

    const cleanup = () => {
        cancelAnimationFrame(rafId);
        st?.kill();
    };

    return { st, cleanup };
}
