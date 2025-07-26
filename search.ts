import { searchAmazonProducts } from './api/amazon';

export async function globalProductSearch(query: string) {
  const amazonResults = await searchAmazonProducts(query);
  // You can add more integrations here (AliExpress, Shein, etc.)
  return [...amazonResults];
}
