import axios from 'axios';

export async function searchAmazonProducts(query: string) {
  const res = await axios.get(`/api/amazon?search=${encodeURIComponent(query)}`);
  return res.data.products;
}
