/* eslint-disable no-console */
import { useEffect, useContext, useState } from 'react';
import Datepicker from '../components/dashboard/Datepicker';
import DoughnutCard from '../components/dashboard/DoughnutCard';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { StatsContext } from '../contexts/StatsContext';
import API from '../APIClient';

export default function Dashboard() {
  const { profile } = useContext(CurrentUserContext);
  const { statsStartDate, statsEndDate, colorBank } = useContext(StatsContext);
  const [nbReqBetweenDates, setNbReqBetweenDates] = useState(null);
  const chartDataSkeleton = {
    labels: [],
    datasets: [
      {
        label: 'title',
        data: [],
        backgroundColor: colorBank.slice(0, 10),
        hoverOffset: 16,
      },
    ],
  };

  const [chartDataRequestByType, setChartDataRequestByType] = useState({
    ...chartDataSkeleton,
    datasets: [
      { ...chartDataSkeleton.datasets[0], label: 'Requêtes par type' },
    ],
  });
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    if (profile && statsStartDate && statsEndDate) {
      API.post(`/statistics/numberReqDates`, { statsStartDate, statsEndDate })
        .then((res) => {
          setNbReqBetweenDates(res.data);
        })
        .catch((err) => console.log(err));

      API.post(`/statistics/mostShowedProducts`, {
        statsStartDate,
        statsEndDate,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [statsStartDate, statsEndDate]);

  useEffect(() => {
    if (nbReqBetweenDates) {
      const requestNumbers = [];
      const requestsLabels = [];
      nbReqBetweenDates.forEach((stat) => {
        requestsLabels.push(stat.requestInfo);
        // eslint-disable-next-line dot-notation
        requestNumbers.push(stat['_count'].requestInfo);
      });
      setTotalRequests(requestNumbers.reduce((acc, curr) => acc + curr, 0));
      setChartDataRequestByType({
        ...chartDataRequestByType,
        labels: requestsLabels,
        datasets: [
          { ...chartDataRequestByType.datasets[0], data: requestNumbers },
        ],
      });
    }
  }, [nbReqBetweenDates]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="flex justify-between bg-primary p-4 pr-20 rounded-sm mb-8 text-white">
            <div
              className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
              aria-hidden="true"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Bonjour !</h1>
              <p>Voici les dernières statistiques :</p>
            </div>
            <div className="sm:flex sm:justify-end sm:items-center mb-8">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <Datepicker />
              </div>
            </div>
          </div>
          {nbReqBetweenDates && (
            <div className="grid grid-cols-12 gap-6">
              <DoughnutCard
                chartData={chartDataRequestByType}
                width={389}
                height={260}
                title={`${chartDataRequestByType.datasets[0].label} - Total : ${totalRequests}`}
              />
              <DoughnutCard
                chartData={chartDataRequestByType}
                width={389}
                height={260}
                title={`${chartDataRequestByType.datasets[0].label} - Total : ${totalRequests}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
