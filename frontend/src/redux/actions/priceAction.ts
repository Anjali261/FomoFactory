import { Action } from 'redux';
import { PriceData } from '../../types';
import { fetchPrices } from '../../services/api'; // Ensure this import path is correct

export const SET_PRICES = 'SET_PRICES';
export const SET_SYMBOL = 'SET_SYMBOL';

export const setPrices = (prices: PriceData[]) => ({
  type: SET_PRICES,
  payload: prices,
});

export const setSymbol = (symbol: string) => ({
  type: SET_SYMBOL,
  payload: symbol,
});

export const fetchAndSetPrices = (symbol: string) => async (dispatch: any) => {
  try {
    const prices = await fetchPrices(symbol);
    dispatch(setPrices(prices));
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
};
