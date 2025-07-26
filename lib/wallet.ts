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
    newBalance
