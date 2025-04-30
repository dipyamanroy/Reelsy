"use client"

import { Upload, Wand2, Video, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const steps = [
    {
        title: "Upload Your Content",
        description: "Start with images, text prompts, or existing video clips that you want to transform.",
        icon: Upload,
        color: "bg-blue-500/10 text-blue-500",
    },
    {
        title: "AI Magic",
        description: "Our advanced AI analyzes your content and generates professional short videos.",
        icon: Wand2,
        color: "bg-purple-500/10 text-purple-500",
    },
    {
        title: "Download & Share",
        description: "Get your finished video in seconds, ready to share across all social media platforms.",
        icon: Video,
        color: "bg-green-500/10 text-green-500",
    },
]

export default function HowItWorks() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    return (
        <section className="py-12 sm:py-24 rounded-b-2xl bg-[#0c0c0c] relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <Badge className="mb-2 sm:mb-3">How it works</Badge>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Sprinkling AI magic</h2>
                    <p className="text-gray-400 mt-2 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base">
                        Create stunning short videos in just three simple steps.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative"
                >
                    {steps.map((step, index) => (
                        <motion.div key={index} variants={item} className="relative">
                            <Card className="border-0 bg-zinc-900/60 backdrop-blur-sm shadow-xl h-full transition-all duration-300 hover:translate-y-[-8px] hover:shadow-2xl">
                                <CardHeader className="pb-2 pt-4 px-4 sm:px-6">
                                    <motion.div
                                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                        transition={{ duration: 0.5 }}
                                        className={`${step.color} p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4`}
                                    >
                                        <step.icon size={24} className="sm:hidden" />
                                        <step.icon size={28} className="hidden sm:block" />
                                    </motion.div>
                                    <CardTitle className="text-xl sm:text-2xl">{step.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="px-4 sm:px-6 text-sm sm:text-base">
                                    <p className="text-gray-400">{step.description}</p>
                                </CardContent>
                            </Card>

                            {index < steps.length - 1 && (
                                <>
                                    {/* Arrow for horizontal layout (medium screens and up) */}
                                    <div className="hidden md:flex absolute top-1/2 -right-4 transform translate-x-0 -translate-y-1/2 z-20 items-center justify-center">
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                                        >
                                            <ChevronRight className="text-gray-500" size={24} />
                                        </motion.div>
                                    </div>

                                    {/* Arrow for tablet layout (small screens) */}
                                    <div className="hidden sm:flex md:hidden absolute top-1/2 -right-3 transform translate-x-0 -translate-y-1/2 z-20 items-center justify-center">
                                        {index % 2 === 0 && (
                                            <motion.div
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                                            >
                                                <ChevronRight className="text-gray-500" size={20} />
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Arrow for mobile layout (down arrow) */}
                                    <div className="flex sm:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-20 items-center justify-center">
                                        <motion.div
                                            animate={{ y: [0, 5, 0] }}
                                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                                        >
                                            <ChevronRight className="text-gray-500 rotate-90" size={20} />
                                        </motion.div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
