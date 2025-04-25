"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock } from "lucide-react"
import React from "react"

function Features() {
    const features = [
        {
            title: "AI-Powered Content",
            description: "Automatically generate scroll-stopping short-form videos tailored to your brand.",
            comingSoon: false,
        },
        {
            title: "Fast Turnaround",
            description: "Create engaging content in seconds — perfect for daily posts or campaigns.",
            comingSoon: false,
        },
        {
            title: "Customization Options",
            description: "Adjust tone, style, and branding to fit your voice with easy controls.",
            comingSoon: false,
        },
        {
            title: "Multi-Platform Support",
            description: "Optimized for TikTok, Reels, YouTube Shorts and more.",
            comingSoon: false,
        },
        {
            title: "Analytics Dashboard",
            description: "Track performance, engagement, and iterate your content strategy.",
            comingSoon: true,
        },
        {
            title: "Team Collaboration",
            description: "Invite your team to collaborate, review drafts, and share feedback easily.",
            comingSoon: true,
        },
    ]

    return (
        <section className="py-20 px-6 md:px-24 xl:px-60 bg-[#0c0c0c] text-gray-200">
            <div className="text-center mb-12">
                <Badge className="mb-3">What You Get</Badge>
                <h2 className="text-3xl sm:text-4xl font-bold">Features Built for Speed & Scale</h2>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                    Everything you need to generate high-converting short-form content with AI at the core.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className={`flex items-start gap-4 p-4 rounded-lg ${feature.comingSoon ? "opacity-50" : ""
                            }`}
                    >
                        {feature.comingSoon ? (
                            <Clock className="text-yellow-400 mt-1" size={22} />
                        ) : (
                            <CheckCircle className="text-green-500 mt-1" size={22} />
                        )}
                        <div className="text-left">
                            <h4 className="text-lg flex flex-col font-semibold">
                                {feature.title}
                                {feature.comingSoon && (
                                    <span className="text-sm text-yellow-400">Coming Soon</span>
                                )}
                            </h4>
                            <p className="text-sm text-gray-400 mt-1">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Features
