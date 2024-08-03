import { createStore } from 'redux';
import rootReducer from './reducers';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load state from localStorage', err);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error('Failed to save state to localStorage', err);
  }
};

const store = createStore(
  rootReducer,
  loadState(),
  // Apply middleware here if needed
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
