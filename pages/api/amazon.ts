import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required and must be a string.' });
  }

  try {
    const response = await axios.get('https://amazon23.p.rapidapi.com/product-search', {
      params: { query, country: 'US' },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
        'X-RapidAPI-Host': 'amazon23.p.rapidapi.com',
      },
    });

    const results = response.data.result?.map((item: any) => ({
      title: item.title,
      price: item.price?.current_price || 'Unavailable',
      image: item.thumbnail,
      link: item.url,
      source: 'amazon',
    })) || [];

    res.status(200).json(results);
  } catch (error: any) {
    console.error('Amazon API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch products from Amazon' });
  }
}
