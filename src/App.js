import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import ResultsContext from './contexts/ResultsContext';

function App() {
  const [resultsList, setResultsList] = useState([]);

  return (
    <ResultsContext.Provider value={{ resultsList, setResultsList }}>
      <div className="App">
        <Header />
        <Main />
      </div>
    </ResultsContext.Provider>
  );
}

export default App;
