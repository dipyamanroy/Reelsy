'use client'

import { Upload, Wand2, Video, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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
                staggerChildren: 0.2
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <section className="py-24 rounded-b-2xl bg-[#0c0c0c] relative overflow-hidden">
            <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
            <Badge className="mb-3">How it works</Badge>
                <h2 className="text-3xl sm:text-4xl font-bold">Sprinkling AI magic</h2>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                Create stunning short videos in just three simple steps.
                </p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mx-24"
            >
                {steps.map((step, index) => (
                    <motion.div key={index} variants={item} className="relative">
                        <Card className="border-0 bg-zinc-900/60 backdrop-blur-sm shadow-xl h-full transition-all duration-300 hover:translate-y-[-8px] hover:shadow-2xl">
                            <CardHeader className="pb-2">
                                <motion.div
                                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                    transition={{ duration: 0.5 }}
                                    className={`${step.color} p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4`}
                                >
                                    <step.icon size={28} />
                                </motion.div>
                                <CardTitle className="text-2xl">{step.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400">{step.description}</p>
                            </CardContent>
                        </Card>

                        {index < steps.length - 1 && (
                            <div className="hidden md:flex absolute top-1/2 -right-6 transform translate-x-0 -translate-y-1/2 z-20 items-center justify-center">
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <ChevronRight className="text-gray-500" size={24} />
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </div>
        </section >
    )
}
