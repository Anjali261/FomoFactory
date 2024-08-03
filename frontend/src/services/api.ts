import axios from 'axios';

const API_URL = 'http://localhost:4000/prices'; // Adjust to match your API URL

export const fetchPrices = async (symbol: string) => {
  const response = await axios.get(`${API_URL}/${symbol}`);
  return response.data;
};
