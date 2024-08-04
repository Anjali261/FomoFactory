import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import pricesReducer from '../reducer/priceReducer';
import symbolReducer from '../reducer/symbolReducer';

// Combine reducers
const rootReducer = combineReducers({
  prices: pricesReducer,
  symbol: symbolReducer,
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Create store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

// Persist state to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));
});

// Load initial state from localStorage
const preloadedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')!) : undefined;

const storeWithPreloadedState = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

export default storeWithPreloadedState;
