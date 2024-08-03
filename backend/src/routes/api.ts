// import express from 'express';
// import PriceData from '../models/PriceData';

// const router = express.Router();

// router.get('/prices/:symbol', async (req, res) => {
//   try {
//     const symbol = req.params.symbol;
//     const data = await PriceData.find({ symbol }).sort({ timestamp: -1 }).limit(20);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// export default router;

import express from 'express';
import PriceData from '../models/PriceData'; // Import the model

const router = express.Router();

// Route to get the most recent 20 entries for a symbol
router.get('/prices/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const data = await PriceData.find({ symbol }).sort({ timestamp: -1 }).limit(20);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
