import { NextResponse } from 'next/server';
import { searchAmazonProducts } from '@/lib/api/amazon';
import { searchAliExpressProducts } from '@/lib/api/aliexpress';
import { searchTradalProducts } from '@/lib/api/tradal';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('search') || '';

  const [amazonResults, aliExpressResults, tradalResults] = await Promise.all([
    searchAmazonProducts(query),
    searchAliExpressProducts(query),
    searchTradalProducts(query),
  ]);

  const combined = [
    ...amazonResults.map(p => ({ ...p, source: 'Amazon' })),
    ...aliExpressResults.map(p => ({ ...p, source: 'AliExpress' })),
    ...tradalResults.map(p => ({ ...p, source: 'Tradal' })),
  ];

  return NextResponse.json({ products: combined });
}
