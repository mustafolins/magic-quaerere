import './App.css';
import CardSearch from './Components/CardSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CardSearch color='red' power='>3' />
      </header>
    </div>
  );
}

export default App;
