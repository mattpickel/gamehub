import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GamesPage from './pages/GamesPage';
import NavBar from './components/NavBar';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className='h-screen flex flex-col'>
        <NavBar />
        <Routes>
          <Route path="/" element={<GamesPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
