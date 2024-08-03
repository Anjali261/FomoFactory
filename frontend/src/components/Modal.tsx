import React, { useState } from 'react';

interface ModalProps {
  onChangeSymbol: (symbol: string) => void;
}

const Modal: React.FC<ModalProps> = ({ onChangeSymbol }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');

  const handleSubmit = () => {
    onChangeSymbol(newSymbol);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Change Symbol</button>
      {isOpen && (
        <div className="modal">
          <h2>Change Stock/Crypto</h2>
          <input
            type="text"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default Modal;
