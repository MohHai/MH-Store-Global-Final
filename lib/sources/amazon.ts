import axios from 'axios';

export async function getAmazonProducts(query: string) {
  const options = {
    method: 'GET',
    url: 'https://amazon-data-1.p.rapidapi.com/search',
    params: { query },
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
      'X-RapidAPI-Host': 'amazon-data-1.p.rapidapi.com'
    },
  };

  try {
    const res = await axios.request(options);
    return res.data.result?.map((item: any) => ({
      title: item.title,
      price: item.price?.current_price || item.price?.value || 'Unavailable',
      image: item.thumbnail || item.image,
      link: item.link || item.url,
      source: 'amazon'
    })) || [];
  } catch {
    return [];
  }
}
