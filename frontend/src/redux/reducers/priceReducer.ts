import { SET_PRICES, SET_SYMBOL } from '../actions/priceAction';
import { Action } from 'redux';
import { PriceData } from '../../types';

interface PriceState {
  prices: PriceData[];
  selectedSymbol: string;
}

const initialState: PriceState = {
  prices: [],
  selectedSymbol: 'bitcoin',
};

const priceReducer = (state = initialState, action: Action<string> & { payload?: any }): PriceState => {
  switch (action.type) {
    case SET_PRICES:
      return {
        ...state,
        prices: action.payload,
      };
    case SET_SYMBOL:
      return {
        ...state,
        selectedSymbol: action.payload,
      };
    default:
      return state;
  }
};

export default priceReducer;
