// import axios from 'axios';
// import Bottleneck from 'bottleneck';
// import PriceData from '../models/PriceData';
// import { Request, Response } from 'express';

// const API_URL = 'https://api.coingecko.com/api/v3/simple/price';
// const SYMBOLS = ['bitcoin', 'ethereum', 'litecoin', 'dogecoin', 'ripple'];
// const POLL_INTERVAL = 5000; // Poll every 5 seconds
// const BASE_DELAY = 1000; // Base delay of 1 second
// const MAX_RETRIES = 5; // Maximum number of retries
// const SYMBOL_DELAY = 10000; // Delay between polling each symbol (10 seconds)

// // Create a Bottleneck limiter to manage request rate
// const limiter = new Bottleneck({
//   minTime: BASE_DELAY, // Minimum time between requests
//   maxConcurrent: 1, // Limit to 1 request at a time
// });

// // Function to fetch and save data
// const fetchAndSaveData = async (symbol: string, retries = 0) => {
//   try {
//     console.log('Polling data for ${symbol}...');
//     const response = await axios.get(`${API_URL}?ids=${symbol}&vs_currencies=usd`);
//     const price = response.data[symbol]?.usd;
//     console.log("Polled data is: ", response.data)
//     if (price) {
//       // Save data to MongoDB
//       const newData = new PriceData({ symbol, price });
//       await newData.save();
//       console.log('Data for ${symbol} saved successfully.');
//     } else {
//       console.error('No price data found for ${symbol}');
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const statusCode = error.response?.status;
//       if (statusCode === 429 && retries < MAX_RETRIES) {
//         const retryAfterHeader = error.response?.headers['retry-after'];
//         const delay = retryAfterHeader ? parseInt(retryAfterHeader) * 1000 : BASE_DELAY * Math.pow(2, retries);
//         console.error('Rate limit exceeded for ${symbol}. Retrying in ${delay / 1000} seconds...');
//         await new Promise(resolve => setTimeout(resolve, delay));
//         await fetchAndSaveData(symbol, retries + 1); // Retry fetching and saving data
//       } else {
//         console.error('ror polling data for ${symbol}:', error.message);
//       }
//     } else {
//       console.error('Unexpected error:', error);
//     }
//   }
// };

// // Poll data at regular intervals
// export const pollData = async () => {
//   for (const symbol of SYMBOLS) {
//     await limiter.schedule(() => fetchAndSaveData(symbol));
//     await new Promise(resolve => setTimeout(resolve, SYMBOL_DELAY));
//   }
//   setTimeout(pollData, POLL_INTERVAL);
// };

// export const getRecentPriceData = async (req: Request, res: Response) => {
//   const { symbol } = req.params;
//   console.log("fetching price data for: ",symbol);
//   try {
//     const recentPriceData = await PriceData.find({ symbol })
//       .sort({ createdAt: -1 })
//       .limit(20)
//       .lean();

//     console.log("Fetched data: ", recentPriceData)

//     res.json(recentPriceData);
//   } catch (error) {
//     console.error('Error fetching recent price data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



import axios from 'axios';
import Bottleneck from 'bottleneck';
import PriceData from '../models/PriceData';
import { Request, Response } from 'express';

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const SYMBOLS = ['bitcoin', 'ethereum', 'litecoin', 'dogecoin', 'ripple'];
const POLL_INTERVAL = 5000; // Poll every 5 seconds
const BASE_DELAY = 1000; // Base delay of 1 second
const MAX_RETRIES = 5; // Maximum number of retries
const SYMBOL_DELAY = 10000; // Delay between polling each symbol (10 seconds)

// Create a Bottleneck limiter to manage request rate
const limiter = new Bottleneck({
  minTime: BASE_DELAY, // Minimum time between requests
  maxConcurrent: 1, // Limit to 1 request at a time
});

// Function to fetch and save data
const fetchAndSaveData = async (symbol: string, retries = 0) => {
  try {
    console.log(`Polling data for ${symbol}...`);
    const response = await axios.get(`${API_URL}?ids=${symbol}&vs_currencies=usd`);
    const price = response.data[symbol]?.usd;
    console.log("Polled data is: ", response.data)
    if (price) {
      // Save data to MongoDB
      const newData = new PriceData({ symbol, price });
      await newData.save();
      console.log(`Data for ${symbol} saved successfully.`);
    } else {
      console.error(`No price data found for ${symbol}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      if (statusCode === 429 && retries < MAX_RETRIES) {
        const retryAfterHeader = error.response?.headers['retry-after'];
        const delay = retryAfterHeader ? parseInt(retryAfterHeader) * 1000 : BASE_DELAY * Math.pow(2, retries);
        console.error(`Rate limit exceeded for ${symbol}. Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        await fetchAndSaveData(symbol, retries + 1); // Retry fetching and saving data
      } else {
        console.error(`Error polling data for ${symbol}:`, error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

// Poll data at regular intervals
export const pollData = async () => {
  for (const symbol of SYMBOLS) {
    await limiter.schedule(() => fetchAndSaveData(symbol));
    await new Promise(resolve => setTimeout(resolve, SYMBOL_DELAY));
  }
  setTimeout(pollData, POLL_INTERVAL);
};

export const getRecentPriceData = async (req: Request, res: Response) => {
  const { symbol } = req.params;
  console.log("fetching price data for: ",symbol);
  try {
    const recentPriceData = await PriceData.find({ symbol })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    console.log("Fetched data: ", recentPriceData)

    res.json(recentPriceData);
  } catch (error) {
    console.error('Error fetching recent price data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getRecentPriceDataForAllSymbols = async (req: Request, res: Response) => {
  try {
    const recentPriceData = await PriceData.aggregate([
      { $sort: { createdAt: -1 } },
      { $group: { _id: '$symbol', data: { $push: '$$ROOT' } } },
      { $project: { symbol: '$_id', data: { $slice: ['$data', 20] } } },
      { $unwind: '$data' },
      { $replaceRoot: { newRoot: '$data' } },
      { $group: { _id: null, data: { $push: '$$ROOT' } } },
      { $project: { data: 1, _id: 0 } },
    ]);

    res.json(recentPriceData[0]?.data || []);
  } catch (error) {
    console.error('Error fetching recent price data for all symbols:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};