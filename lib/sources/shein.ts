import axios from 'axios';

export async function getSheinProducts(query: string) {
  const options = {
    method: 'GET',
    url: 'https://shein-api.p.rapidapi.com/search',
    params: { keyword: query, limit: 20, country: 'US' },
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
      'X-RapidAPI-Host': 'shein-api.p.rapidapi.com'
    },
  };

  try {
    const res = await axios.request(options);
    return res.data.products?.map((item: any) => ({
      title: item.name,
      price: item.price?.current || 'Unavailable',
      image: item.main_image,
      link: item.product_url,
      source: 'shein'
    })) || [];
  } catch {
    return [];
  }
}
