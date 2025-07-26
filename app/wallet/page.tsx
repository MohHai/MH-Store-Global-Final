'use client';

import { useEffect, useState } from 'react';
import { getWalletBalance } from '@/lib/wallet';

export default function WalletPage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      const userId = localStorage.getItem('user_id'); // تأكد أنك خزنت user_id عند تسجيل الدخول
      if (!userId) return;

      const result = await getWalletBalance(userId);
      if (result.success) {
        setBalance(result.data.balance);
      }
      setLoading(false);
    };

    fetchBalance();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">رصيد المحفظة</h1>
      {loading ? (
        <p>جاري التحميل...</p>
      ) : (
        <p className="text-xl">
          {balance !== null ? `رصيدك: $${balance.toFixed(2)}` : 'تعذر جلب الرصيد'}
        </p>
      )}
    </div>
  );
}
