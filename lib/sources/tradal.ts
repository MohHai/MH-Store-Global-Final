import axios from 'axios';

export async function getTradalProducts(query: string) {
  // تكامل عبر RapidAPI أو endpoint تجريبي
  const options = {
    method: 'GET',
    url: 'https://tradal-products.p.rapidapi.com/search',
    params: { query },
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
      'X-RapidAPI-Host': 'tradal-products.p.rapidapi.com'
    },
  };

  try {
    const res = await axios.request(options);
    return res.data.products?.map((item: any) => ({
      title: item.title,
      price: item.price || 'Unavailable',
      image: item.image,
      link: item.link,
      source: 'tradal'
    })) || [];
  } catch {
    return [];
  }
}
