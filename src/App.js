import React from 'react'
import './App.css';
import CardSearch from './Components/CardSearch';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import Battlefield from './Components/P2P/Battlefield';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<CardSearch color={['r']} order='name' />} />
            <Route path='/battle' element={<Battlefield />} />
          </Routes>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
