// Define action types as constants
export const SET_PRICES = 'SET_PRICES';
export const SET_SYMBOL = 'SET_SYMBOL';

// Define interfaces for action types
interface Price {
  symbol: string;
  timestamp: string;
  price: number;
}

export interface SetPricesAction {
  type: typeof SET_PRICES;
  payload: Price[];
}

export interface SetSymbolAction {
  type: typeof SET_SYMBOL;
  payload: string;
}

// Union type for all actions
export type PricesActionTypes = SetPricesAction;
export type SymbolActionTypes = SetSymbolAction;

// Action creators
export const setPrices = (prices: Price[]): SetPricesAction => ({
  type: SET_PRICES,
  payload: prices,
});

export const setSymbol = (symbol: string): SetSymbolAction => ({
  type: SET_SYMBOL,
  payload: symbol,
});
