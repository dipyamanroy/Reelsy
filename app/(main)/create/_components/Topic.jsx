"use client"

import { useAuthContext } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { Sparkle, Sparkles, Loader2 } from 'lucide-react';
import React, { useState } from 'react';

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
    const [finalTopic, setFinalTopic] = useState('');
    const [scripts, setScripts] = useState();
    const [selectedScriptIndex, setSelectedScriptIndex] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();

    const handleTopicChange = (value) => {
        onHandleInputChange('topic', value);
        setFinalTopic(value);
        setScripts(undefined);
        setSelectedScriptIndex(null);
    };

    const GenerateScript = async () => {
        if(user?.credits <= 0)
        {
            toast('You are all out of credits!')
            return;
        }

        if (!finalTopic) {
            console.error("No topic provided");
            return;
        }

        setIsLoading(true);
        setSelectedScriptIndex(null);
        try {
            const result = await axios.post('/api/generate-script', {
                topic: finalTopic
            });
            setScripts(result.data?.scripts);
        } catch (error) {
            console.error("Error generating script:", error);
        }
        setIsLoading(false);
    };

    return (
        <div>
            <h2 className='mb-1'>Project Title</h2>
            <Input
                placeholder="Enter project title"
                onChange={(event) => onHandleInputChange('title', event?.target.value)}
            />

            <div className='mt-6'>
                <h2>Topic</h2>
                <p className='text-sm text-gray-400'>Add or select your video topic</p>
                <Tabs defaultValue="your_topic" className="w-full mt-2">
                    <TabsList>
                        <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
                        <TabsTrigger value="suggestion">
                            <Sparkle /> Suggestions
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="your_topic">
                        <Textarea
                            placeholder="Enter your topic"
                            onChange={(event) => handleTopicChange(event.target.value)}
                            className="mt-2"
                        />
                    </TabsContent>

                    <TabsContent value="suggestion">
                        <div className='mt-2'>
                            {suggestions.map((suggestion, index) => (
                                <Button
                                    key={index}
                                    variant={selectedTopic === suggestion ? "secondary" : "outline"}
                                    onClick={() => {
                                        setSelectedTopic(suggestion);
                                        handleTopicChange(suggestion);
                                    }}
                                    className="mr-2 mb-2"
                                >
                                    {suggestion}
                                </Button>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {scripts?.length > 0 &&
                    <div className='mt-3'>
                        <h2>Select the script</h2>
                        <div className='grid grid-cols-2 gap-5 mt-1'>
                            {scripts?.map((item, index) => (
                                <div key={index}
                                    className={`p-3 border rounded-lg cursor-pointer
                                ${selectedScriptIndex == index && 'border-white bg-secondary'}
                            `}
                                    onClick={() => {setSelectedScriptIndex(index)
                                        onHandleInputChange('script', item.content)
                                    }}>
                                    <h2 className='line-clamp-4 text-sm text-gray-300'>{item.content}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>

            <Button
                className={`mt-3 transition-opacity duration-300 ${selectedScriptIndex != null ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                size='sm'
                onClick={GenerateScript}
                disabled={isLoading}
            >
                {isLoading ? (
                    <Loader2 className="animate-spin mr-1" size={16} />
                ) : (
                    <Sparkles className="mr-1" size={16} />
                )}
                Generate Script
            </Button>

        </div>
    );
}

export default Topic;