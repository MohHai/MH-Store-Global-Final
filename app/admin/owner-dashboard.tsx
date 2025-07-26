'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function OwnerDashboard() {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    async function fetchBalance() {
      const { data, error } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', 'owner_wallet')
        .single();

      if (!error && data) {
        setBalance(data.balance);
      }
    }

    fetchBalance();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">لوحة أرباح المتجر</h2>
      {balance !== null ? (
        <p className="text-lg text-green-600">الإجمالي: ${balance.toFixed(2)}</p>
      ) : (
        <p>جاري التحميل...</p>
      )}
    </div>
  );
}
