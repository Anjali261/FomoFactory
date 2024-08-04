// src/redux/reducers/index.ts
import { combineReducers } from 'redux';
import priceReducer from './priceReducer';

const rootReducer = combineReducers({
  prices: priceReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
