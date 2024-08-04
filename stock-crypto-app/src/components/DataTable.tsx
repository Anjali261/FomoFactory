

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../store/dataSlice';
import { RootState, AppDispatch } from '../store/store';
import './DataTable.css';

const DataTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, symbol } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(fetchData(symbol));
    const interval = setInterval(() => {
      dispatch(fetchData(symbol));
    }, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval);
  }, [dispatch, symbol]);

  if (status === 'loading') {
    return <p className="loading">Loading...</p>;
  }

  if (status === 'failed') {
    return <p className="error">Failed to load data.</p>;
  }

  return (
    <div className="data-table-container">
                <h1>Name:{symbol}</h1>

      <table className="data-table">
        <thead>
          <tr>
            <th>Time - USD</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{new Date(entry.createdAt).toLocaleTimeString()}</td>
              <td>{entry.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

