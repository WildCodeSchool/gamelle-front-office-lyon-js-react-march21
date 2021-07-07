import { ToastProvider } from 'react-toast-notifications';
import './index.css';
import Header from './components/Header';
import Main from './components/Main';
import ResultsContextProvider from './contexts/ResultsContext';
import FoodContextProvider from './contexts/FoodContext';
import CurrentUserContextProvider from './contexts/CurrentUserContext';
import StatsContextProvider from './contexts/StatsContext';

function App() {
  return (
    <div className="bg-grey dark:bg-darkblue min-h-screen">
      <ToastProvider
        autoDismiss
        autoDismissTimeout={5000}
        placement="bottom-right"
      >
        <CurrentUserContextProvider>
          <ResultsContextProvider>
            <FoodContextProvider>
              <StatsContextProvider>
                <Header />
                <Main />
              </StatsContextProvider>
            </FoodContextProvider>
          </ResultsContextProvider>
        </CurrentUserContextProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
