export default async function handler(req: NextApiRequest, res: NextApiResponse) { if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }

const { products, shippingInfo, userEmail } = req.body;

if (!products || !shippingInfo || !userEmail) { return res.status(400).json({ error: 'Missing required fields' }); }

try {

return res.status(200).json({ message: 'Order placed successfully' });

} catch (error) { console.error('Checkout error:', error); return res.status(500).json({ error: 'Internal server error' }); } }

