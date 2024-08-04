// src/App.tsx
import React from 'react';
import PriceTable from './components/PriceTable';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Real-Time Price Data</h1>
      <PriceTable />
    </div>
  );
};

export default App;
