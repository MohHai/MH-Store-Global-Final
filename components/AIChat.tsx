'use client';
import { useState } from 'react';

export default function AIChat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const botMessage = { role: 'assistant', content: data.reply };
      setMessages([...messages, userMessage, botMessage]);
      setInput('');
    } catch (err) {
      alert('حدث خطأ أثناء التواصل مع المساعد الذكي');
    }

    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">🧠 مساعد الذكاء الاصطناعي</h2>
      <div className="h-64 overflow-y-auto bg-gray-50 p-2 rounded mb-2">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-1 ${msg.role === 'user' ? 'text-right text-blue-700' : 'text-left text-gray-800'}`}>
            <span className="inline-block p-2 rounded bg-gray-200">{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اسأل شيئاً..."
          className="flex-grow p-2 border rounded-l"
        />
        <button onClick={sendMessage} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-r">
          {loading ? 'جاري...' : 'أرسل'}
        </button>
      </div>
    </div>
  );
}
