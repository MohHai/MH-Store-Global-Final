import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST' });
  }

  const { productLink, destinationCountry, zipCode } = req.body;

  if (!productLink || !destinationCountry || !zipCode) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await axios.post('https://api.tradal.io/v1/shipping/estimate', {
      product_url: productLink,
      destination_country: destinationCountry,
      destination_zip: zipCode,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.TRADAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Tradal API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch shipping estimate from Tradal' });
  }
}
