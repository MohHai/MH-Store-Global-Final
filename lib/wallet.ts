import { supabase } from './supabaseClient';

// إنشاء محفظة جديدة لمستخدم (تُستخدم عادة مرة واحدة عند تسجيل المستخدم)
export async function createWallet(userId: string) {
  const { data, error } = await supabase
    .from('wallets')
    .insert([{ user_id: userId, balance: 0 }])
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// جلب رصيد المحفظة بناءً على userId
export async function getWalletBalance(userId: string) {
  const { data, error } = await supabase
    .from('wallets')
    .select('balance, id')
    .eq('user_id', userId)
    .single();

  if (error) throw new Error(error.message);
  return data; // { balance: number, id: string }
}

// تسجيل عملية جديدة (ايداع، سحب، شراء)
export async function addTransaction(
  walletId: string,
  type: 'deposit' | 'withdraw' | 'purchase',
  amount: number
) {
  if (amount <= 0) throw new Error('Amount must be greater than zero.');

  // جلب المحفظة أولاً
  const { data: wallet, error: walletError } = await supabase
    .from('wallets')
    .select('balance')
    .eq('id', walletId)
    .single();

  if (walletError) throw new Error(walletError.message);

  let newBalance = wallet.balance;

  if (type === 'deposit') {
    newBalance += amount;
  } else if (type === 'withdraw' || type === 'purchase') {
    if (wallet.balance < amount) throw new Error('Insufficient balance.');
    newBalance -= amount;
  } else {
    throw new Error('Invalid transaction type.');
  }

  // تحديث الرصيد الجديد في المحفظة
  const { error: updateError } = await supabase
    .from('wallets')
    .update({ balance: newBalance })
    .eq('id', walletId);

  if (updateError) throw new Error(updateError.message);

  // تسجيل العملية في جدول transactions
  const { data, error } = await supabase
    .from('transactions')
    .insert([{ wallet_id: walletId, type, amount }])
    .single();

  if (error) throw new Error(error.message);

  return data; // بيانات العملية المضافة
}

// جلب كل المعاملات لمحفظة معينة (مرتبة من الأحدث للأقدم)
export async function getTransactions(walletId: string) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('wallet_id', walletId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data;
      }
