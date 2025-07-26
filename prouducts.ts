import { getAmazonProducts } from './sources/amazon';
import { getTradalProducts } from './sources/tradal';
import { getAliExpressProducts } from './sources/aliexpress';
import { getSheinProducts } from './sources/shein';

export async function searchAllProducts(query: string) {
  try {
    const [amazon, tradal, aliexpress, shein] = await Promise.all([
      getAmazonProducts(query),
      getTradalProducts(query),
      getAliExpressProducts(query),
      getSheinProducts(query),
    ]);

    return [...amazon, ...tradal, ...aliexpress, ...shein];
  } catch (error) {
    console.error('Product search error:', error);
    return [];
  }
            }
