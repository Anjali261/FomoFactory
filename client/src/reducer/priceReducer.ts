import { PricesActionTypes, SET_PRICES } from '../actions/priceAction';

interface Price {
  symbol: string;
  timestamp: string;
  price: number;
}

interface PricesState {
  prices: Price[];
}

const initialState: PricesState = {
  prices: [],
};

const pricesReducer = (state = initialState, action: PricesActionTypes): PricesState => {
  switch (action.type) {
    case SET_PRICES:
      return {
        ...state,
        prices: action.payload,
      };
    default:
      return state;
  }
};

export default pricesReducer;
