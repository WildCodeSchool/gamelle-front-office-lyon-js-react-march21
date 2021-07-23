import { createContext, useState } from 'react';

export const StatsContext = createContext();

export default function StatsContextProvider({ children }) {
  const [statsStartDate, setStatsStartDate] = useState(null);
  const [statsEndDate, setStatsEndDate] = useState(null);
  const [statsbetweenDates, setStatsbetweenDates] = useState(null);
  const colorBank = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(96, 80, 220)',
    'rgb(233, 201, 177)',
    'rgb(1, 215, 88)',
    'rgb(0, 217, 255)',
    'rgb(130, 160, 130)',
    'rgb(211, 124, 51)',
    'rgb(186, 0, 0)',
  ];

  return (
    <StatsContext.Provider
      value={{
        statsStartDate,
        setStatsStartDate,
        statsEndDate,
        setStatsEndDate,
        statsbetweenDates,
        setStatsbetweenDates,
        colorBank,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}
