import axios from 'axios';

export async function getAliExpressProducts(query: string) {
  const options = {
    method: 'GET',
    url: 'https://aliexpress-data-api.p.rapidapi.com/search',
    params: { query },
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
      'X-RapidAPI-Host': 'aliexpress-data-api.p.rapidapi.com'
    },
  };

  try {
    const res = await axios.request(options);
    return res.data.products?.map((item: any) => ({
      title: item.title,
      price: item.price?.current_price || 'Unavailable',
      image: item.image_url,
      link: item.product_url,
      source: 'aliexpress'
    })) || [];
  } catch {
    return [];
  }
}
