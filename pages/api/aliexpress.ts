import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const response = await axios.get('https://ali-express1.p.rapidapi.com/search', {
      params: { query: query as string, page: '1' },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
        'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com',
      },
    });

    const results = response.data.docs.map((item: any) => ({
      title: item.product_title,
      price: item.app_sale_price,
      image: item.product_main_image_url,
      link: item.product_detail_url,
      source: 'aliexpress',
    }));

    res.status(200).json(results);
  } catch (error: any) {
    console.error('AliExpress API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch products from AliExpress' });
  }
}
