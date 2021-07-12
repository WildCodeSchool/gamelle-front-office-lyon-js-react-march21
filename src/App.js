import { ToastProvider } from 'react-toast-notifications';
import './index.css';
import './components/button.css';
import Header from './components/Header';
import Main from './components/Main';
import ResultsContextProvider from './contexts/ResultsContext';
import FoodContextProvider from './contexts/FoodContext';
import CurrentUserContextProvider from './contexts/CurrentUserContext';
import DrawerContextProvider from './contexts/DrawerContext';
import AdviceContextProvider from './contexts/AdviceContext';

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
            <AdviceContextProvider>
              <FoodContextProvider>
                <DrawerContextProvider>
                  <Header />
                  <Main />
                </DrawerContextProvider>
              </FoodContextProvider>
            </AdviceContextProvider>
          </ResultsContextProvider>
        </CurrentUserContextProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
