'use client'

import { useEffect } from "react"
import { MutableRefObject } from "react"
import { Group } from "three"
import { gsap } from "@/lib/gsap"

export default function useScrollRig(
    rig: MutableRefObject<Group | null>
) {

    useEffect(() => {

        if (!rig.current) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-wrap",
                start: "top top",
                end: "+=200",
                scrub: true,
                pin: true,
                pinSpacing: false,

            }
        })

        tl.to(rig.current.position, {
            z: 2,
            y: 0.5
        })

        return () => {
            tl.scrollTrigger?.kill()
            tl.kill()
        }

    }, [rig])

}