import axios from 'axios';

export async function searchAmazon(query: string) {
  const response = await axios.get(`/api/amazon?query=${query}`);
  return response.data;
}
