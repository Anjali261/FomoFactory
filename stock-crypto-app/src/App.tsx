
import React, { useState } from 'react';
import DataTable from './components/DataTable';
import SymbolModal from './components/SymbolModel'; // Note the corrected import path
import './App.css'; // Ensure CSS is imported

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <button className="change-symbol-button" onClick={handleOpenModal}>Change Stock/Crypto</button>
      <DataTable />
      <SymbolModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
