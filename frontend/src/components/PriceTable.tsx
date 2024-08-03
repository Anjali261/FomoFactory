import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { fetchAndSetPrices, setSymbol } from '../redux/actions/priceAction';
import Modal from './Modal';

const PriceTable: React.FC = () => {
  const dispatch = useDispatch();
  const prices = useSelector((state: AppState) => state.prices.prices);
  const selectedSymbol = useSelector((state: AppState) => state.prices.selectedSymbol);

  React.useEffect(() => {
    dispatch(fetchAndSetPrices(selectedSymbol));
    const interval = setInterval(() => {
      dispatch(fetchAndSetPrices(selectedSymbol));
    }, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval);
  }, [dispatch, selectedSymbol]);

  const handleChangeSymbol = (newSymbol: string) => {
    dispatch(setSymbol(newSymbol));
  };

  return (
    <div>
      <Modal onChangeSymbol={handleChangeSymbol} />
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr key={price.timestamp}>
              <td>{price.symbol}</td>
              <td>{price.price}</td>
              <td>{new Date(price.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;
