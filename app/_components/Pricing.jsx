"use client"

import { Card, CardHeader, CardBody, CardFooter, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import React from 'react'
import { useAuthContext } from "../provider"
import Authentication from "./Authentication"
import Link from "next/link"
import { Loader2 } from "lucide-react"

function Pricing() {
    const { user, loading } = useAuthContext();

    return (
        <section id="pricing" className="py-16 text-center">
            <Badge className="mb-3">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-200">Choose Your Plan</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-4 md:px-16">

                {/* Basic Plan */}
                <Card className="max-w-xs mx-auto shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                    <CardHeader className='flex flex-col justify-center items-center'>
                        <h3 className="text-2xl font-semibold text-gray-200 mb-4">Basic</h3>
                        <Badge variant="outline" className="text-amber-400">$4.99/month</Badge>
                    </CardHeader>
                    <CardContent className="text-gray-300">
                        <ul className="text-left mb-6">
                            <li>• Trial 5 Short-form Content Generations</li>
                            <li>• Basic Customization</li>
                            <li>• Standard Support</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        {loading ? (
                            <Button disabled variant="outline" className="w-full"><Loader2 className="animate-spin"/></Button>
                        ) : !user ? (
                            <Authentication>
                                <Button className="bg-gradient-to-br from-green-400 to-blue-500 text-gray-900 w-full hover:bg-gradient-to-b transition duration-300">
                                    Get Started
                                </Button>
                            </Authentication>
                        ) : (
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/dashboard">Subscribed</Link>
                            </Button>
                        )}
                    </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className="max-w-xs mx-auto shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                    <CardHeader className='flex flex-col justify-center items-center'>
                        <h3 className="text-2xl font-semibold text-gray-200 mb-4">Pro</h3>
                        <Badge variant="outline" className="text-neutral-400">$19.99/month</Badge>
                    </CardHeader>
                    <CardContent className="text-gray-300">
                        <ul className="text-left mb-6">
                            <li>• 20 Short-form Content Generations</li>
                            <li>• Advanced Customization</li>
                            <li>• Priority Support</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button disabled variant='outline' className="w-full">
                            Coming soon
                        </Button>
                    </CardFooter>
                </Card>

                {/* Enterprise Plan */}
                <Card className="max-w-xs mx-auto shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                    <CardHeader className='flex flex-col justify-center items-center'>
                        <h3 className="text-2xl font-semibold text-gray-200 mb-4">Enterprise</h3>
                        <Badge variant="outline" className="text-neutral-400">Custom Pricing</Badge>
                    </CardHeader>
                    <CardContent className="text-gray-300">
                        <ul className="text-left mb-6">
                            <li>• Unlimited Short-form Content Generations</li>
                            <li>• Full Customization</li>
                            <li>• 24/7 Premium Support</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button disabled variant='outline' className="w-full">
                            Coming soon
                        </Button>
                    </CardFooter>
                </Card>

            </div>
        </section>
    )
}

export default Pricing;
