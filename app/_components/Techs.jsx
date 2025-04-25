"use client"

import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import React from "react"
import Marquee from "react-fast-marquee"

const tech = [
    { name: "OpenAI", logo: "/tech/openai.png" },
    { name: "Vercel", logo: "/tech/vercel.png" },
    { name: "GCP", logo: "/tech/firebase.png" },
    { name: "Firebase", logo: "/tech/gcp.png" },
    { name: "Deepgram", logo: "/tech/deepgram.svg" },
    { name: "Inngest", logo: "/tech/inngest.png" },
    { name: "Convex", logo: "/tech/convex.png" },
    { name: "Replicate", logo: "/tech/replicate.png" },
]

function Techs() {
    return (
        <section className="w-full py-20 overflow-hidden">
            <h2 className="text-2xl flex flex-col items-center justify-center sm:text-3xl font-bold text-gray-200 text-center mb-10">
            <Badge className="mb-3">Tech</Badge>
                What powers Reelsy
            </h2>

            <Marquee gradient={false} speed={50}>
                {tech.map((sponsor, idx) => (
                    <div
                        key={idx}
                        className="mx-6 w-32 sm:w-40 opacity-80 hover:opacity-100 transition duration-300"
                    >
                        <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            width={100}
                            height={25}
                            className="w-full h-auto object-contain filter grayscale brightness-150 hover:grayscale-0 hover:brightness-125 transition duration-300"
                        />
                    </div>
                ))}
            </Marquee>
        </section>
    )
}

export default Techs
