import { supabase } from '../supabaseClient';
import { addProfitToOwner } from './ownerWallet';

export async function processPurchaseWithSplit(walletId: string, amount: number) {
  const productCost = amount * 0.6;    // 60% تكلفة المنتج
  const shippingCost = amount * 0.2;   // 20% تكلفة الشحن
  const storeProfit = amount * 0.2;    // 20% ربح المتجر

  // جلب رصيد المحفظة
  const { data: wallet, error: walletError } = await supabase
    .from('wallets')
    .select('balance')
    .eq('id', walletId)
    .single();

  if (walletError) throw new Error(walletError.message);
  if (wallet.balance < amount) throw new Error('الرصيد غير كافٍ.');

  const newBalance = wallet.balance - amount;

  // تحديث الرصيد
  const { error: updateError } = await supabase
    .from('wallets')
    .update({ balance: newBalance })
    .eq('id', walletId);

  if (updateError) throw new Error(updateError.message);

  // تسجيل العملية
  const { error: transactionError } = await supabase
    .from('transactions')
    .insert([{ wallet_id: walletId, type: 'purchase', amount }]);

  if (transactionError) throw new Error(transactionError.message);

  // تحويل الربح إلى محفظة المالك
  await addProfitToOwner(storeProfit);
}
