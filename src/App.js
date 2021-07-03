import { useEffect, useState } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import './index.css';
import { isMobileOnly, isTablet, isDesktop, osName } from 'react-device-detect';
import Header from './components/Header';
import Main from './components/Main';
import ResultsContext from './contexts/ResultsContext';
import FoodContext from './contexts/FoodContext';
import DeviceContext from './contexts/DeviceContext';
import CurrentUserContextProvider from './contexts/CurrentUserContext';

const publicIp = require('public-ip');

function App() {
  const [resultsList, setResultsList] = useState([]);
  const [foodDetails, setFoodDetails] = useState([]);
  const [userDevice, setUserDevice] = useState([]);

  useEffect(async () => {
    let device = null;
    if (isMobileOnly) {
      device = 'mobile';
    } else if (isTablet) {
      device = 'tablet';
    } else if (isDesktop) {
      device = 'desktop';
    }

    const ipv4Address = await publicIp.v4();
    const ipv6Address = await publicIp.v6();

    setUserDevice({ device, osName, ipv4Address, ipv6Address });
  }, []);
  return (
    <div className="bg-grey dark:bg-darkblue min-h-screen">
      <ToastProvider
        autoDismiss
        autoDismissTimeout={5000}
        placement="bottom-right"
      >
        <CurrentUserContextProvider>
          <DeviceContext.Provider value={{ userDevice }}>
            <ResultsContext.Provider value={{ resultsList, setResultsList }}>
              <FoodContext.Provider value={{ foodDetails, setFoodDetails }}>
                <Header />
                <Main />
              </FoodContext.Provider>
            </ResultsContext.Provider>
          </DeviceContext.Provider>
        </CurrentUserContextProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
