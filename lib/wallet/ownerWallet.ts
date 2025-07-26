import { supabase } from '../supabaseClient';

// ثوابت تعريفية
const OWNER_ID = 'owner_wallet'; // يمكن تغييره لاحقاً لنظام ثابت حسب الحساب

// إنشاء المحفظة إن لم تكن موجودة
export async function ensureOwnerWallet() {
  const { data, error } = await supabase
    .from('wallets')
    .select('id')
    .eq('user_id', OWNER_ID)
    .single();

  if (!data && !error) {
    const { error: createError } = await supabase
      .from('wallets')
      .insert([{ user_id: OWNER_ID, balance: 0 }]);

    if (createError) throw new Error('فشل في إنشاء محفظة المالك: ' + createError.message);
  }
}

// تحديث رصيد المالك (إضافة أرباح)
export async function addProfitToOwner(amount: number) {
  const { data: walletData, error } = await supabase
    .from('wallets')
    .select('balance')
    .eq('user_id', OWNER_ID)
    .single();

  if (error) throw new Error('فشل في جلب محفظة المالك: ' + error.message);

  const newBalance = walletData.balance + amount;

  const { error: updateError } = await supabase
    .from('wallets')
    .update({ balance: newBalance })
    .eq('user_id', OWNER_ID);

  if (updateError) throw new Error('فشل في تحديث رصيد المالك: ' + updateError.message);
}
