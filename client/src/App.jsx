import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import VendingMachine from './components/VendingMachine';
import SnackForm from './components/SnackForm';
import UpdateSnackForm from './components/UpdateSnack';

function App() {
  const handleButtonClick = (code) => {
    console.log(`Button clicked: ${code}`);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<VendingMachine onButtonClick={handleButtonClick} />} />
        <Route path="/add-snack" element={<SnackForm />} />
        <Route path="/update-snack/:id" element={<UpdateSnackForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
