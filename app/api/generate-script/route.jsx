import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SCRIPT_PROMPT = `Write two different scripts for a 30 second video on the topic: {topic}.
1. Do not add scene description.
2. Do not add anything in braces, just return the plain story in text.
3. Give me the response in JSON format and follow the schema:
{
    "scripts": [
        {
        "content": ""
        },
    ]
}`;

export async function POST(req) {
    try {
        const { topic } = await req.json();

        if (!topic) {
            return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
        }

        const prompt = SCRIPT_PROMPT.replace('{topic}', topic);

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'user', content: prompt }
            ],
            temperature: 0.95,
        });

        const resp = completion.choices[0]?.message?.content;

        try {
            return NextResponse.json(JSON.parse(resp || ''));
        } catch {
        }

    } catch (error) {
        console.error('OpenAI Error:', error);
        return NextResponse.json({ error: 'Failed to generate response.' }, { status: 500 });
    }
}
