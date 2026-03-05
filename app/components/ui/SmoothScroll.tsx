"use client";

import { useLenisScroll } from "@/app/lib/hooks/useLenisScroll";

export default function SmoothScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    useLenisScroll();

    return <>{children}</>;
}