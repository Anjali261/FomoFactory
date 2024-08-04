import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchPrices } from '../actions/priceAction';
import SymbolModal from './SymbolModal';

const PriceTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const symbol = useSelector((state: RootState) => state.symbol.symbol);
  const prices = useSelector((state: RootState) => state.prices.prices);

  useEffect(() => {
    dispatch(fetchPrices(symbol));
  }, [dispatch, symbol]);

  return (
    <div>
      <h1>Price Table</h1>
      <button onClick={() => setIsModalOpen(true)}>Change Stock/Crypto</button>
      <SymbolModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Timestamp</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr key={price.timestamp}>
              <td>{price.symbol}</td>
              <td>{new Date(price.timestamp).toLocaleString()}</td>
              <td>${price.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;
