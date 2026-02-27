"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import gsap from "gsap";

interface TransitionLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
}

export default function TransitionLink({ href, children, className }: TransitionLinkProps) {
    const router = useRouter();

    const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        // Cinematic page exit animation
        // Target common global layout elements like the main container
        const main = document.querySelector("main") || document.body;

        gsap.to(main, {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: "power3.in",
            onComplete: () => {
                router.push(href);
                // Reset opacity for the next page load (it will animate in via its own effects)
                gsap.set(main, { opacity: 1, y: 0, delay: 0.1 });
            },
        });
    };

    return (
        <Link href={href} onClick={handleTransition} className={className}>
            {children}
        </Link>
    );
}
