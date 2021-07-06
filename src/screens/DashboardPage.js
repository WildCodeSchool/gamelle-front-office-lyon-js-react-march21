/* eslint-disable no-console */
import { useEffect, useContext, useState } from 'react';
import Datepicker from '../components/dashboard/Datepicker';
import RequestsByType from '../components/dashboard/RequestsByType';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { StatsContext } from '../contexts/StatsContext';
import API from '../APIClient';
import '../components/dashboard/css/style.css';

export default function Dashboard() {
  const { profile } = useContext(CurrentUserContext);
  const {
    statsStartDate,
    statsEndDate,
    statsbetweenDates,
    setStatsbetweenDates,
    colorBank,
  } = useContext(StatsContext);
  const [chartDataRequestByType, setChartDataRequestByType] = useState({
    labels: [
      'search',
      'foodDetails',
      'history',
      'favorites',
      'addFavorite',
      'removeFavorite',
    ],
    datasets: [
      {
        label: 'Requêtes par type',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: colorBank.slice(0, 6),
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    if (profile && statsStartDate && statsEndDate) {
      API.post(`/statistics/reqDates`, { statsStartDate, statsEndDate })
        .then((res) => {
          setStatsbetweenDates(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [statsStartDate, statsEndDate]);

  useEffect(() => {
    if (statsbetweenDates) {
      console.log(statsbetweenDates);
      const requestNumbers = [0, 0, 0, 0, 0, 0];
      statsbetweenDates.forEach((stat) => {
        switch (stat.requestInfo) {
          case 'search':
            requestNumbers[0] += 1;
            break;
          case 'foodDetails':
            requestNumbers[1] += 1;
            break;
          case 'history':
            requestNumbers[2] += 1;
            break;
          case 'favorites':
            requestNumbers[3] += 1;
            break;
          case 'addFavorite':
            requestNumbers[4] += 1;
            break;
          case 'removeFavorite':
            requestNumbers[5] += 1;
            break;
          default:
            break;
        }
      });
      setChartDataRequestByType({
        ...chartDataRequestByType,
        datasets: [
          { ...chartDataRequestByType.datasets[0], data: requestNumbers },
        ],
      });
    }
  }, [statsbetweenDates]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
            <div
              className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
              aria-hidden="true"
            />
            <div className="relative">
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold mb-1">
                Bonjour !
              </h1>
              <p>Voici les dernières statistiques :</p>
            </div>
          </div>

          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <Datepicker />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {console.log(chartDataRequestByType)}
            {console.log(chartDataRequestByType.datasets[0].data)}
            <RequestsByType chartData={chartDataRequestByType} />
          </div>
        </div>
      </div>
    </div>
  );
}
