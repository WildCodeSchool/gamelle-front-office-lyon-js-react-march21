import { createContext, useEffect, useState } from 'react';
import { isMobileOnly, isTablet, isDesktop, osName } from 'react-device-detect';
import publicIp from 'public-ip';

export const DeviceContext = createContext();

export default function DeviceContextProvider({ children }) {
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
    <DeviceContext.Provider value={{ userDevice }}>
      {children}
    </DeviceContext.Provider>
  );
}
