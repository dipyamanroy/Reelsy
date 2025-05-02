"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { CreditCard, Package, Zap, CheckCircle, ArrowRight } from "lucide-react"

export default function BillingPage() {
    const [creditAmount, setCreditAmount] = useState(10)
    const [currentPlan, setCurrentPlan] = useState("basic")

    const handleCreditChange = (value) => {
        setCreditAmount(value[0])
    }
    return (
        <div>
            <Badge className="mb-4" variant="destructive">Demo page (Not functional)</Badge>

            <div
                className="absolute w-60 h-60 bg-gradient-to-br from-green-400 via-blue-400 to-blue-500 rounded-full blur-2xl opacity-40 z-[-20] pointer-events-none animate-pulse shadow-[0_0_80px_30px_rgba(34,197,94,0.3)]"
                style={{ top: "-100px", right: '20%' }}
            />
            <h2 className="text-3xl">Billing</h2>
            <h2 className="text-md text-neutral-400 mb-8">Manage your subscription and credits</h2>

            <Card className="mb-10 border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 className="text-xl font-semibold text-neutral-200">Current Plan</h3>
                            <p className="text-neutral-400">Your subscription details</p>
                        </div>
                        <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                            {currentPlan === "basic" ? "Basic" : currentPlan === "pro" ? "Pro" : "Enterprise"}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-neutral-800 p-2 rounded-full">
                                <CreditCard className="h-5 w-5 text-green-400" />
                            </div>
                            <div>
                                <p className="text-neutral-300 font-medium">Billing Cycle</p>
                                <p className="text-neutral-400 text-sm">Monthly</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-neutral-800 p-2 rounded-full">
                                <Zap className="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-neutral-300 font-medium">Next Payment</p>
                                <p className="text-neutral-400 text-sm">May 29, 2025</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-neutral-800 p-2 rounded-full">
                                <Package className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-neutral-300 font-medium">Credits Remaining</p>
                                <p className="text-neutral-400 text-sm">3 of 5</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" className="w-full sm:w-auto">
                        Cancel Subscription
                    </Button>
                    <Button className="bg-gradient-to-br from-green-400 to-blue-500 text-neutral-900 w-full sm:w-auto hover:bg-gradient-to-b transition duration-300">
                        Manage Payment Methods
                    </Button>
                </CardFooter>
            </Card>

            {/* Tabs for Credits and Plans */}
            <Tabs defaultValue="credits" className="mb-10">
                <TabsList className="grid w-full grid-cols-2 bg-neutral-800/50 backdrop-blur-sm">
                    <TabsTrigger value="credits">Buy Credits</TabsTrigger>
                    <TabsTrigger value="plans">Change Plan</TabsTrigger>
                </TabsList>

                {/* Credits Tab */}
                <TabsContent value="credits">
                    <Card className="border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
                        <CardHeader>
                            <h3 className="text-xl font-semibold text-neutral-200">Purchase Additional Credits</h3>
                            <p className="text-neutral-400">Buy credits to generate more content regardless of your plan</p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-neutral-300">Credit Amount: {creditAmount}</span>
                                        <span className="text-neutral-300 font-medium">${(creditAmount * 0.99).toFixed(2)}</span>
                                    </div>
                                    <Slider
                                        defaultValue={[10]}
                                        max={100}
                                        min={5}
                                        step={5}
                                        onValueChange={handleCreditChange}
                                        className="my-4"
                                    />
                                    <div className="flex justify-between text-sm text-neutral-400">
                                        <span>5 credits</span>
                                        <span>100 credits</span>
                                    </div>
                                </div>

                                <div className="bg-neutral-800/50 p-4 rounded-lg">
                                    <h4 className="text-neutral-200 font-medium mb-2">Credit Usage</h4>
                                    <ul className="space-y-2 text-neutral-300">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>1 credit = 1 short-form content generation</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>Credits never expire</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                            <span>Use alongside your subscription plan</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="bg-gradient-to-br from-green-400 to-blue-500 text-neutral-900 w-full hover:bg-gradient-to-b transition duration-300">
                                Purchase {creditAmount} Credits for ${(creditAmount * 0.99).toFixed(2)}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Plans Tab */}
                <TabsContent value="plans">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Basic Plan */}
                        <Card
                            className={`border ${currentPlan === "basic" ? "border-green-400" : "border-neutral-800"} bg-neutral-900/50 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-105`}
                        >
                            <CardHeader className="flex flex-col justify-center items-center">
                                <h3 className="text-2xl font-semibold text-neutral-200 mb-4">Basic</h3>
                                <Badge variant="outline" className="text-amber-400">
                                    $4.99/month
                                </Badge>
                                {currentPlan === "basic" && <Badge className="mt-2 bg-green-400/20 text-green-400">Current Plan</Badge>}
                            </CardHeader>
                            <CardContent className="text-neutral-300">
                                <ul className="text-left mb-6 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>5 Short-form Content Generations</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>Basic Customization</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>Standard Support</span>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                {currentPlan === "basic" ? (
                                    <Button disabled className="w-full">
                                        Current Plan
                                    </Button>
                                ) : (
                                    <Button className="bg-gradient-to-br from-green-400 to-blue-500 text-neutral-900 w-full hover:bg-gradient-to-b transition duration-300">
                                        Downgrade
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>

                        {/* Pro Plan */}
                        <Card
                            className={`border ${currentPlan === "pro" ? "border-green-400" : "border-neutral-800"} bg-neutral-900/50 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-105`}
                        >
                            <CardHeader className="flex flex-col justify-center items-center">
                                <h3 className="text-2xl font-semibold text-neutral-200 mb-4">Pro</h3>
                                <Badge variant="outline" className="text-neutral-400">
                                    $19.99/month
                                </Badge>
                                {currentPlan === "pro" && <Badge className="mt-2 bg-green-400/20 text-green-400">Current Plan</Badge>}
                            </CardHeader>
                            <CardContent className="text-neutral-300">
                                <ul className="text-left mb-6 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>20 Short-form Content Generations</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>Advanced Customization</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>Priority Support</span>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                {currentPlan === "pro" ? (
                                    <Button disabled className="w-full">
                                        Current Plan
                                    </Button>
                                ) : currentPlan === "basic" ? (
                                    <Button className="bg-gradient-to-br from-green-400 to-blue-500 text-neutral-900 w-full hover:bg-gradient-to-b transition duration-300">
                                        Upgrade <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button className="bg-gradient-to-br from-green-400 to-blue-500 text-neutral-900 w-full hover:bg-gradient-to-b transition duration-300">
                                        Downgrade
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>

                        {/* Enterprise Plan */}
                        <Card
                            className={`border ${currentPlan === "enterprise" ? "border-green-400" : "border-neutral-800"} bg-neutral-900/50 backdrop-blur-sm transition duration-300 ease-in-out transform hover:scale-105`}
                        >
                            <CardHeader className="flex flex-col justify-center items-center">
                                <h3 className="text-2xl font-semibold text-neutral-200 mb-4">Enterprise</h3>
                                <Badge variant="outline" className="text-neutral-400">
                                    Custom Pricing
                                </Badge>
                                {currentPlan === "enterprise" && (
                                    <Badge className="mt-2 bg-green-400/20 text-green-400">Current Plan</Badge>
                                )}
                            </CardHeader>
                            <CardContent className="text-neutral-300">
                                <ul className="text-left mb-6 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>Unlimited Short-form Content Generations</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>Full Customization</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>24/7 Premium Support</span>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                {currentPlan === "enterprise" ? (
                                    <Button disabled className="w-full">
                                        Current Plan
                                    </Button>
                                ) : (
                                    <Button className="bg-gradient-to-br from-green-400 to-blue-500 text-neutral-900 w-full hover:bg-gradient-to-b transition duration-300">
                                        Contact Sales
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Payment History */}
            <Card className="border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
                <CardHeader>
                    <h3 className="text-xl font-semibold text-neutral-200">Payment History</h3>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-neutral-800">
                                    <th className="text-left py-3 px-4 text-neutral-400 font-medium">Date</th>
                                    <th className="text-left py-3 px-4 text-neutral-400 font-medium">Description</th>
                                    <th className="text-left py-3 px-4 text-neutral-400 font-medium">Amount</th>
                                    <th className="text-left py-3 px-4 text-neutral-400 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-neutral-800">
                                    <td className="py-3 px-4 text-neutral-300">Apr 29, 2025</td>
                                    <td className="py-3 px-4 text-neutral-300">Basic Plan - Monthly</td>
                                    <td className="py-3 px-4 text-neutral-300">$4.99</td>
                                    <td className="py-3 px-4">
                                        <Badge className="bg-green-400/20 text-green-400">Paid</Badge>
                                    </td>
                                </tr>
                                <tr className="border-b border-neutral-800">
                                    <td className="py-3 px-4 text-neutral-300">Apr 15, 2025</td>
                                    <td className="py-3 px-4 text-neutral-300">Credit Purchase - 10 Credits</td>
                                    <td className="py-3 px-4 text-neutral-300">$9.90</td>
                                    <td className="py-3 px-4">
                                        <Badge className="bg-green-400/20 text-green-400">Paid</Badge>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 text-neutral-300">Mar 29, 2025</td>
                                    <td className="py-3 px-4 text-neutral-300">Basic Plan - Monthly</td>
                                    <td className="py-3 px-4 text-neutral-300">$4.99</td>
                                    <td className="py-3 px-4">
                                        <Badge className="bg-green-400/20 text-green-400">Paid</Badge>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full sm:w-auto">
                        View All Transactions
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
