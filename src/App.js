import React from 'react'
import './App.css';
import CardSearch from './Components/CardSearch';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blue, purple } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: purple[700],
    },
    secondary: {
      main: blue[500],
    },
  },
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <CardSearch color={['r']} order='name' />
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
