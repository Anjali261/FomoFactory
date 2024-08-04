import { SymbolActionTypes, SET_SYMBOL } from '../actions/priceAction';

interface SymbolState {
  symbol: string;
}

const initialState: SymbolState = {
  symbol: 'GOOG', // Default symbol
};

const symbolReducer = (state = initialState, action: SymbolActionTypes): SymbolState => {
  switch (action.type) {
    case SET_SYMBOL:
      return {
        ...state,
        symbol: action.payload,
      };
    default:
      return state;
  }
};

export default symbolReducer;
