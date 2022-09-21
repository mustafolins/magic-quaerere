import React from 'react'
import './App.css';
import CardSearch from './Components/CardSearch';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
          <CardSearch color={['r']} power='>3' />
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
