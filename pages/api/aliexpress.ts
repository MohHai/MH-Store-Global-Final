import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required and must be a string.' });
  }

  try {
    const response = await axios.get('https://aliexpress-data-api.p.rapidapi.com/search', {
      params: { query, country: 'US', page: '1', limit: '20' },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
        'X-RapidAPI-Host': 'aliexpress-data-api.p.rapidapi.com',
      },
    });

    const results = response.data.products?.map((item: any) => ({
      title: item.title,
      price: item.price?.current_price || 'Unavailable',
      image: item.image_url,
      link: item.product_url,
      source: 'aliexpress',
    })) || [];

    res.status(200).json(results);
  } catch (error: any) {
    console.error('AliExpress API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch products from AliExpress' });
  }
}
