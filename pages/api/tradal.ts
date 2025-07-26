import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { country, zipCode, productUrl } = req.query

  if (!country || !zipCode || !productUrl) {
    return res.status(400).json({ error: 'Missing required parameters.' })
  }

  try {
    const response = await axios.post(
      'https://api.tradal.io/v1/shipping/estimate',
      {
        destination_country: country,
        destination_zip: zipCode,
        product_url: productUrl
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TRADAL_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    )

    return res.status(200).json(response.data)
  } catch (error: any) {
    console.error('Tradal API Error:', error.response?.data || error.message)
    return res.status(500).json({ error: 'Failed to fetch shipping estimate from Tradal.' })
  }
}
