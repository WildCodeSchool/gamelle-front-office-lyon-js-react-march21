import { ToastProvider } from 'react-toast-notifications';
import './index.css';
import Header from './components/Header';
import Main from './components/Main';
import ResultsContextProvider from './contexts/ResultsContext';
import FoodContextProvider from './contexts/FoodContext';
import CurrentUserContextProvider from './contexts/CurrentUserContext';
import StatsContextProvider from './contexts/StatsContext';
import DrawerContextProvider from './contexts/DrawerContext';

function App() {
  return (
    <div className="min-h-screen">
      <ToastProvider
        autoDismiss
        autoDismissTimeout={5000}
        placement="bottom-right"
      >
        <CurrentUserContextProvider>
          <ResultsContextProvider>
            <FoodContextProvider>
              <StatsContextProvider>
                <DrawerContextProvider>
                  <Header />
                  <Main />
                </DrawerContextProvider>
              </StatsContextProvider>
            </FoodContextProvider>
          </ResultsContextProvider>
        </CurrentUserContextProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
