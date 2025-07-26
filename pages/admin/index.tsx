'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin-auth', 'true');
      router.push('/admin/dashboard');
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow-md rounded-xl w-80">
        <h1 className="text-xl mb-4 font-bold text-center">تسجيل دخول المدير</h1>
        <input
          type="password"
          placeholder="كلمة المرور"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          دخول
        </button>
      </form>
    </div>
  );
        }
