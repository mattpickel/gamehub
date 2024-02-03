import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GamesPage from './pages/GamesPage';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<GamesPage />} />
      </Routes>
    </div>
  );
};

export default App;