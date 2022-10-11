import React from 'react'
import './App.css';
import CardSearch from './Components/CardSearch';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blue, purple } from '@mui/material/colors';

const queryString = require('query-string')

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
  const parsed = queryString.parse(window.location.search, { arrayFormat: 'index' })
  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <CardSearch nameText={parsed.nameText !== undefined ? parsed.nameText : ''} color={parsed.color !== undefined ? parsed.color : []}
            order={parsed.order !== undefined ? parsed.order : 'name'} format={parsed.format !== undefined ? parsed.format : ''} artistText={parsed.artistText !== undefined ? parsed.artistText : ''} 
            keywordText={parsed.keywordText !== undefined ? parsed.keywordText : ''} creatureText={parsed.creatureText !== undefined ? parsed.creatureText : ''} 
            searchText={parsed.searchText} toughness={parsed.toughness} power={parsed.power} />
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
