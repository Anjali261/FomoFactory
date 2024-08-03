
import axios from 'axios';
import Bottleneck from 'bottleneck';
import PriceData from '../models/PriceData'; // Import the model

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const SYMBOLS = ['bitcoin', 'ethereum', 'litecoin', 'dogecoin', 'ripple'];
const POLL_INTERVAL = 60000; // Poll every 60 seconds
const BASE_DELAY = 1000; // Base delay of 1 second

// Create a Bottleneck limiter to manage request rate
const limiter = new Bottleneck({
  minTime: BASE_DELAY, // Minimum time between requests
  maxConcurrent: 1,   // Limit to 1 request at a time
});

// Function to add jitter to delay
const jitter = (delay: number): number => {
  const jitterValue = Math.floor(Math.random() * delay);
  return delay + jitterValue;
};

// Function to fetch and save data
const fetchAndSaveData = async (symbol: string) => {
  try {
    console.log(`Polling data for ${symbol}...`);
    const response = await axios.get(`${API_URL}?ids=${symbol}&vs_currencies=usd`);
    const price = response.data[symbol].usd;

    // Save data to MongoDB
    await PriceData.create({ symbol, price });
    console.log(`Data for ${symbol} saved successfully.`);
    
    // Add a delay between requests
    await new Promise(resolve => setTimeout(resolve, jitter(BASE_DELAY)));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      if (statusCode === 429) {
        const retryAfterHeader = error.response?.headers['retry-after'];
        const delay = retryAfterHeader ? parseInt(retryAfterHeader) * 1000 : jitter(BASE_DELAY * 2);
        console.error(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        await fetchAndSaveData(symbol); // Retry fetching and saving data
      } else {
        console.error(`Error polling data for ${symbol}:`, error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

// Function to poll data for all symbols
const pollData = async () => {
  for (const symbol of SYMBOLS) {
    await limiter.schedule(() => fetchAndSaveData(symbol));
  }
};

// Poll data at regular intervals
setInterval(pollData, POLL_INTERVAL);

