import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  message?: string;
  error?: string;
  tradalResponse?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { products, shippingInfo, userEmail } = req.body;

  // تحقق من الحقول الأساسية
  if (!products || !shippingInfo || !userEmail) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // إرسال الطلب لخدمة Tradal الخارجية
    const tradalRes = await axios.post(
      'https://api.tradal.ai/forward-order',
      { products, shippingInfo, userEmail },
      {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${process.env.TRADAL_API_KEY}`, // ضع مفتاح API هنا إذا كان مطلوبًا
        },
      }
    );

    return res.status(200).json({
      message: 'Order placed successfully',
      tradalResponse: tradalRes.data,
    });
  } catch (error: any) {
    console.error('Checkout error:', error.response?.data || error.message);
    return res.status(500).json({
      error: 'Failed to forward order to Tradal',
    });
  }
}
