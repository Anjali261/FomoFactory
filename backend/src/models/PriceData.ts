

import mongoose, { Schema, Document } from 'mongoose';

export interface IPriceData extends Document {
  symbol: string;
  price: number;
  currency: string;
  timestamp: Date;
}

const PriceDataSchema: Schema = new Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  currency: {type: String, default: "USD"},
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IPriceData>('PriceData', PriceDataSchema);