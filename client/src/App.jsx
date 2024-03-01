import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import VendingMachine from './components/VendingMachine';
import SnackForm from './components/SnackForm';

function App() {
  const handleButtonClick = (code) => {
    console.log(`Button clicked: ${code}`);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<VendingMachine onButtonClick={handleButtonClick} />} />
        <Route path="/add-snack" element={<SnackForm />} />
      </Routes>
    </div>
  );
}

export default App;
