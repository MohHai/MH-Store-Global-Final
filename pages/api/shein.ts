import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  const results = [
    {
      title: `Floral Dress - ${query}`,
      price: '$24.99',
      image: 'https://img.ltwebstatic.com/images3_pi/2023/06/01/1685592341df7.jpg',
      link: 'https://www.shein.com/item/example',
      source: 'shein',
    },
    {
      title: `Summer T-Shirt - ${query}`,
      price: '$13.50',
      image: 'https://img.ltwebstatic.com/images3_pi/2023/05/01/16855921fkjsk.jpg',
      link: 'https://www.shein.com/item/example2',
      source: 'shein',
    },
  ];

  res.status(200).json(results);
}
