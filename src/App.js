import { useState } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import './index.css';
import Header from './components/Header';
import Main from './components/Main';
import ResultsContext from './contexts/ResultsContext';
import ConnectedContext from './contexts/ConnectedContext';

function App() {
  const [resultsList, setResultsList] = useState([]);
  const [connected, setConnected] = useState(false);
  return (
    <div className="bg-grey dark:bg-darkblue">
      <ToastProvider
        autoDismiss
        autoDismissTimeout={5000}
        placement="bottom-right"
      >
        <ConnectedContext.Provider value={{ connected, setConnected }}>
          <ResultsContext.Provider value={{ resultsList, setResultsList }}>
            <Header />
            <Main />
          </ResultsContext.Provider>
        </ConnectedContext.Provider>
      </ToastProvider>
    </div>
  );
}

export default App;
