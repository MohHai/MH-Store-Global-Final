import { getAmazonProducts } from './sources/amazon';
import { getAliExpressProducts } from './sources/aliexpress';
import { getSheinProducts } from './sources/shein';
import { getTradalProducts } from './sources/tradal';

export async function searchAllProducts(query: string) {
  const [amazon, aliexpress, shein, tradal] = await Promise.all([
    getAmazonProducts(query),
    getAliExpressProducts(query),
    getSheinProducts(query),
    getTradalProducts(query)
  ]);
  return [...amazon, ...aliexpress, ...shein, ...tradal];
}
