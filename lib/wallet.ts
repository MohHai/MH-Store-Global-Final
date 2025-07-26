// wallet.ts

import { supabase } from './supabaseClient';

// إنشاء محفظة جديدة لمستخدم (تُستخدم مرة واحدة عند تسجيل المستخدم)
export async function createWallet(userId: string) {
  const { data, error } = await supabase
    .from('wallets')
    .insert([{ user_id: userId, balance: 0 }])
    .single();

  if (error) throw new Error(error.message);
  return data; // بيانات المحفظة الجديدة
}

// جلب رصيد المحفظة بناءً على userId
export async function getWalletBalance(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from('wallets')
    .select('balance')
    .eq('user_id', userId)
    .single();

  if (error) throw new Error(error.message);
  return data.balance;
}

// تسجيل عملية جديدة (إيداع، سحب، شراء) مع تحديث الرصيد تلقائياً
export async function addTransaction(
  userId: string,
  type: 'deposit' | 'withdraw' | 'purchase',
  amount: number
) {
  if (amount <= 0) throw new Error('المبلغ يجب أن يكون أكبر من صفر.');

  // جلب المحفظة أولاً
  const { data: wallet, error: walletError } = await supabase
    .from('wallets')
    .select('id, balance')
    .eq('user_id', userId)
    .single();

  if (walletError) throw new Error(walletError.message);

  let newBalance = wallet.balance;

  if (type === 'deposit') {
    newBalance += amount;
  } else if (type === 'withdraw' || type === 'purchase') {
    if (wallet.balance < amount) throw new Error('الرصيد غير كافٍ.');
    newBalance -= amount;
  } else {
    throw new Error('نوع العملية غير صحيح.');
  }

  // تحديث الرصيد الجديد في المحفظة
  const { error: updateError } = await supabase
    .from('wallets')
    .update({ balance: newBalance })
    .eq('id', wallet.id);

  if (updateError) throw new Error(updateError.message);

  // تسجيل العملية في جدول transactions
  const { data, error } = await supabase
    .from('transactions')
    .insert([{ wallet_id: wallet.id, type, amount }])
    .single();

  if (error) throw new Error(error.message);

  return data; // بيانات العملية المسجلة
}

// جلب كل المعاملات لمحفظة مستخدم معين مرتبة من الأحدث للأقدم
export async function getTransactions(userId: string) {
  // جلب id المحفظة أولاً
  const { data: wallet, error: walletError } = await supabase
    .from('wallets')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (walletError) throw new Error(walletError.message);

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('wallet_id', wallet.id)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data;
  }
