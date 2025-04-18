"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from '@/components/ui/textarea';
import { Sparkle } from 'lucide-react'
import React, { useState } from 'react'

const suggestions = [
    // SaaS
    "SaaS Onboarding Hacks",
    "SaaS Tips and Tricks",
    "New Feature Highlight",

    // Consumer Goods
    "Seasonal Product Launch",
    "In-Store Promo Ideas",
    "Influencer Unboxing Magic",
];



function Topic({ onHandleInputChange }) {
    const [selectedTopic, setSelectedTopic] = useState();
    return (
        <div>
            <h2 className='mb-1'>Project Title</h2>
            <Input placeholder="Enter project title" />

            <div className='mt-5'>
                <h2>Topic</h2>
                <p className='text-sm text-gray-600'>Add or select your video topic</p>
                <Tabs defaultValue="your_topic" className="w-full mt-2">
                    <TabsList>
                        <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
                        <TabsTrigger value="suggestion"><Sparkle className='text-amber-200' /> Suggestions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="your_topic">
                        <div>
                            <Textarea placeholder="Enter your topic"/>
                        </div>
                    </TabsContent>
                    <TabsContent value="suggestion">
                        <div className=''>
                            {suggestions.map((suggestion, index) => (
                                <Button
                                    key={index}
                                    variant={selectedTopic === suggestion ? "secondary" : "outline"}
                                    onClick={() => setSelectedTopic(suggestion)}
                                    className="mr-2 mb-2"
                                >
                                    {suggestion}
                                </Button>

                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    )
}

export default Topic