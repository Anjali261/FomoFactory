

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSymbol } from '../store/dataSlice';
import { AppDispatch } from '../store/store';
import './SymbolModal.css'; // Import the CSS file for styling

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SymbolModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [newSymbol, setNewSymbol] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    if (newSymbol.trim()) {
      dispatch(setSymbol(newSymbol));
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Change Stock/Crypto Symbol</h2>
        <input
          type="text"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
          placeholder="Enter Symbol"
          className="modal-input"
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit} className="submit-button">Submit</button>
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default SymbolModal;
