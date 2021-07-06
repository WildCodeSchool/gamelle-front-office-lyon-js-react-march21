import { ToastProvider } from 'react-toast-notifications';
import './index.css';
import Header from './components/Header';
import Main from './components/Main';
import ResultsContextProvider from './contexts/ResultsContext';
import FoodContextProvider from './contexts/FoodContext';
import DeviceContextProvider from './contexts/DeviceContext';
import CurrentUserContextProvider from './contexts/CurrentUserContext';
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
          <DeviceContextProvider>
            <ResultsContextProvider>
              <FoodContextProvider>
                <DrawerContextProvider>
                  <Header />
                  <Main />
                </DrawerContextProvider>
              </FoodContextProvider>
            </ResultsContextProvider>
          </DeviceContextProvider>
        </CurrentUserContextProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
