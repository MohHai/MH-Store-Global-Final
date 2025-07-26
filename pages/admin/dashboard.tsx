'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem('admin-auth');
    if (isAuth !== 'true') {
      router.push('/admin');
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">لوحة تحكم المدير</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* يمكنك هنا إضافة مكونات: عدد الطلبات، الأرباح، المستخدمين، المحفظة، إلخ */}
        <div className="bg-white shadow p-4 rounded">المحفظة: $0.00</div>
        <div className="bg-white shadow p-4 rounded">عدد الطلبات: 0</div>
        <div className="bg-white shadow p-4 rounded">العملاء المسجلين: 0</div>
      </div>
    </div>
  );
}
