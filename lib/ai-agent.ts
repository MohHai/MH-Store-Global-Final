import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // تأكد من وجود هذا في .env.local
});

export async function askAgent(prompt: string): Promise<string> {
  if (!openai.apiKey) {
    console.error('❌ OPENAI_API_KEY is missing!');
    return 'حدث خطأ في الاتصال بالذكاء الاصطناعي.';
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7, // أكثر مرونة في الإجابات
    });

    return completion.choices[0]?.message?.content?.trim() || 'لا يوجد رد.';
  } catch (error) {
    console.error('AI Agent Error:', error);
    return 'عذرًا، لم أتمكن من معالجة سؤالك حالياً.';
  }
}
