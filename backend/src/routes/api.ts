
import express from 'express';
import { getRecentPriceData } from '../services/dataPolling';
import { getRecentPriceDataForAllSymbols } from '../services/dataPolling';

const router = express.Router();

// Route to get the most recent 20 entries for a symbol
router.get('/price-data/:symbol', getRecentPriceData);
router.get('/price-data-all', getRecentPriceDataForAllSymbols);

export default router;