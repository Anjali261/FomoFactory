import { Dispatch } from 'redux';
import { setPrices } from './priceAction';

export const fetchPrices = (symbol: string) => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`http://localhost:4000/prices/${symbol}`);
    const data = await response.json();
    dispatch(setPrices(data));
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
};
