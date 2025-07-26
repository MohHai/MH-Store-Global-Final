import { NextResponse } from 'next/server';
import { askAgent } from '@/lib/ai/ai-agent';

export async function POST(req: Request) {
const { message } = await req.json();

if (!message) {
return NextResponse.json({ error: 'Missing message' }, { status: 400 });
}

const reply = await askAgent(message);
return NextResponse.json({ reply });
}

