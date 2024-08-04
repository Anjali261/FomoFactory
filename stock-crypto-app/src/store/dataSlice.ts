

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface DataState {
  data: { price: number; createdAt: string }[];
  symbol: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DataState = {
  data: [],
  symbol: 'bitcoin',
  status: 'idle',
  error: null,
};

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (symbol: string) => {
    const response = await axios.get(`http://localhost:4000/api/price-data/${symbol}`);
    console.log('Fetched data:', response.data);
    // Map data correctly based on your API response
    return response.data.map((item: any) => ({
      price: item.price, 
      createdAt: item.timestamp 
    }));
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSymbol(state, action: PayloadAction<string>) {
      state.symbol = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<{ price: number; createdAt: string }[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { setSymbol } = dataSlice.actions;
export default dataSlice.reducer;

