import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required and must be a string.' });
  }

  try {
    const response = await axios.get('https://shein-api.p.rapidapi.com/search', {
      params: { keyword: query, limit: 20, country: 'US' },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
        'X-RapidAPI-Host': 'shein-api.p.rapidapi.com',
      },
    });

    // Assuming response.data.products is the list
    const results = response.data.products?.map((item: any) => ({
      title: item.name,
      price: item.price?.current || 'Unavailable',
      image: item.main_image,
      link: item.product_url,
      source: 'shein',
    })) || [];

    res.status(200).json(results);
  } catch (error: any) {
    console.error('Shein API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch products from Shein' });
  }
      }
