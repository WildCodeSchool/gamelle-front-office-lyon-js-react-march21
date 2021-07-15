/* eslint-disable no-console */
import { useEffect, useContext, useState } from 'react';
import Datepicker from '../components/dashboard/Datepicker';
import DoughnutCard from '../components/dashboard/DoughnutCard';
import UserTableCard from '../components/dashboard/UserTableCard';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { StatsContext } from '../contexts/StatsContext';
import API from '../APIClient';

export default function Dashboard() {
  const { profile } = useContext(CurrentUserContext);
  const { statsStartDate, statsEndDate, colorBank } = useContext(StatsContext);
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

  const [nbReqBetweenDates, setNbReqBetweenDates] = useState(null);
  const [chartDataRequestByType, setChartDataRequestByType] = useState({
    ...chartDataSkeleton,
    datasets: [
      { ...chartDataSkeleton.datasets[0], label: 'Requêtes par type' },
    ],
  });
  const [totalRequests, setTotalRequests] = useState(0);

  const [mostViewedFoods, setMostViewedFoods] = useState(null);
  const [chartDataMostViewedFoods, setChartDataMostViewedFoods] = useState({
    ...chartDataSkeleton,
    datasets: [
      {
        ...chartDataSkeleton.datasets[0],
        label: '10 aliments les plus affichés',
      },
    ],
  });
  const [totalMostViewedFoods, setTotalMostViewedFoods] = useState(0);

  const [currentMostFavoriteFoods, setCurrentMostFavoriteFoods] =
    useState(null);
  const [chartDataMostFavoriteFoods, setChartDataMostFavoriteFoods] = useState({
    ...chartDataSkeleton,
    datasets: [
      {
        ...chartDataSkeleton.datasets[0],
        label: '10 aliments les plus entregistrés en favoris actuellement',
      },
    ],
  });
  const [totalCurrentMostFavoriteFoods, setTotalCurrentMostFavoriteFoods] =
    useState(0);

  const [nbFoodTypesBetweenDates, setNbFoodTypesBetweenDates] = useState(null);
  const [chartDataFoodTypes, setChartDataFoodTypes] = useState({
    ...chartDataSkeleton,
    datasets: [{ ...chartDataSkeleton.datasets[0], label: "Types d'aliments" }],
  });
  const [totalFoodType, setTotalFoodType] = useState(0);

  const [nbAnimalCategoriesBetweenDates, setNbAnimalCategoriesBetweenDates] =
    useState(null);
  const [chartDataAnimalCategories, setChartDataAnimalCategories] = useState({
    ...chartDataSkeleton,
    datasets: [
      {
        ...chartDataSkeleton.datasets[0],
        label: "Catégories d'animaux recherchées",
      },
    ],
  });
  const [totalAnimalCategories, setTotalAnimalCategories] = useState(0);

  const [nbDevicesBetweenDates, setNbDevicesBetweenDates] = useState(null);
  const [chartDataDevices, setChartDataDevices] = useState({
    ...chartDataSkeleton,
    datasets: [
      {
        ...chartDataSkeleton.datasets[0],
        label: 'Appareils utilisés',
      },
    ],
  });
  const [totalDevices, setTotalDevices] = useState(0);

  const [nbOSBetweenDates, setNbOSBetweenDates] = useState(null);
  const [chartDataOS, setChartDataOS] = useState({
    ...chartDataSkeleton,
    datasets: [
      {
        ...chartDataSkeleton.datasets[0],
        label: 'OS utilisés',
      },
    ],
  });
  const [totalOS, setTotalOS] = useState(0);

  const [listTenLastUsers, setListTenLastUsers] = useState(null);
  const [listUsers, setListUsers] = useState(null);

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
          setMostViewedFoods(res.data);
        })
        .catch((err) => console.log(err));

      API.post(`/statistics/currentMostFavoriteProducts`)
        .then((res) => {
          setCurrentMostFavoriteFoods(res.data);
        })
        .catch((err) => console.log(err));

      API.post(`/statistics/numberFoodTypesDates`, {
        statsStartDate,
        statsEndDate,
      })
        .then((res) => {
          setNbFoodTypesBetweenDates(res.data);
        })
        .catch((err) => console.log(err));

      API.post(`/statistics/numberAnimalCategoriesDates`, {
        statsStartDate,
        statsEndDate,
      })
        .then((res) => {
          setNbAnimalCategoriesBetweenDates(res.data);
        })
        .catch((err) => console.log(err));

      API.post(`/statistics/devicesUsed`, {
        statsStartDate,
        statsEndDate,
      })
        .then((res) => {
          setNbDevicesBetweenDates(res.data);
        })
        .catch((err) => console.log(err));

      API.post(`/statistics/OSUsed`, {
        statsStartDate,
        statsEndDate,
      })
        .then((res) => {
          setNbOSBetweenDates(res.data);
        })
        .catch((err) => console.log(err));

      API.get(`/users`)
        .then((res) => {
          setListUsers(res.data);
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

  useEffect(() => {
    if (mostViewedFoods) {
      const foodNumbers = [];
      const foodLabels = [];
      mostViewedFoods.forEach((stat) => {
        foodLabels.push(stat.name);
        // eslint-disable-next-line dot-notation
        foodNumbers.push(stat['_count'].foodId);
      });
      setTotalMostViewedFoods(foodNumbers.reduce((acc, curr) => acc + curr, 0));
      setChartDataMostViewedFoods({
        ...chartDataMostViewedFoods,
        labels: foodLabels,
        datasets: [
          { ...chartDataMostViewedFoods.datasets[0], data: foodNumbers },
        ],
      });
    }
  }, [mostViewedFoods]);

  useEffect(() => {
    if (currentMostFavoriteFoods) {
      const foodNumbers = [];
      const foodLabels = [];
      currentMostFavoriteFoods.forEach((stat) => {
        foodLabels.push(stat.name);
        // eslint-disable-next-line dot-notation
        foodNumbers.push(stat['_count'].foodId);
      });
      setTotalCurrentMostFavoriteFoods(
        foodNumbers.reduce((acc, curr) => acc + curr, 0)
      );
      setChartDataMostFavoriteFoods({
        ...chartDataMostFavoriteFoods,
        labels: foodLabels,
        datasets: [
          { ...chartDataMostFavoriteFoods.datasets[0], data: foodNumbers },
        ],
      });
    }
  }, [currentMostFavoriteFoods]);

  useEffect(() => {
    if (nbFoodTypesBetweenDates) {
      const foodTypeNumbers = [];
      const foodTypeLabels = [];
      nbFoodTypesBetweenDates.forEach((stat) => {
        foodTypeLabels.push(stat.name);
        // eslint-disable-next-line dot-notation
        foodTypeNumbers.push(stat['_count'].foodTypeId);
      });
      setTotalFoodType(foodTypeNumbers.reduce((acc, curr) => acc + curr, 0));
      setChartDataFoodTypes({
        ...chartDataFoodTypes,
        labels: foodTypeLabels,
        datasets: [
          { ...chartDataFoodTypes.datasets[0], data: foodTypeNumbers },
        ],
      });
    }
  }, [nbFoodTypesBetweenDates]);

  useEffect(() => {
    if (nbAnimalCategoriesBetweenDates) {
      const animalCategoryNumbers = [];
      const animalCategoryLabels = [];
      nbAnimalCategoriesBetweenDates.forEach((stat) => {
        animalCategoryLabels.push(stat.name);
        // eslint-disable-next-line dot-notation
        animalCategoryNumbers.push(stat['_count'].animalCategoryId);
      });
      setTotalAnimalCategories(
        animalCategoryNumbers.reduce((acc, curr) => acc + curr, 0)
      );
      setChartDataAnimalCategories({
        ...chartDataAnimalCategories,
        labels: animalCategoryLabels,
        datasets: [
          {
            ...chartDataAnimalCategories.datasets[0],
            data: animalCategoryNumbers,
          },
        ],
      });
    }
  }, [nbAnimalCategoriesBetweenDates]);

  useEffect(() => {
    if (nbDevicesBetweenDates) {
      const deviceNumbers = [];
      const deviceLabels = [];
      nbDevicesBetweenDates.forEach((stat) => {
        deviceLabels.push(stat.device);
        // eslint-disable-next-line dot-notation
        deviceNumbers.push(stat['_count'].device);
      });
      setTotalDevices(deviceNumbers.reduce((acc, curr) => acc + curr, 0));
      setChartDataDevices({
        ...chartDataDevices,
        labels: deviceLabels,
        datasets: [{ ...chartDataDevices.datasets[0], data: deviceNumbers }],
      });
    }
  }, [nbDevicesBetweenDates]);

  useEffect(() => {
    if (nbOSBetweenDates) {
      const osNumbers = [];
      const osLabels = [];
      nbOSBetweenDates.forEach((stat) => {
        osLabels.push(stat.osName);
        // eslint-disable-next-line dot-notation
        osNumbers.push(stat['_count'].osName);
      });
      setTotalOS(osNumbers.reduce((acc, curr) => acc + curr, 0));
      setChartDataOS({
        ...chartDataOS,
        labels: osLabels,
        datasets: [{ ...chartDataOS.datasets[0], data: osNumbers }],
      });
    }
  }, [nbOSBetweenDates]);

  useEffect(async () => {
    if (listUsers) {
      const orderedUserList = await Promise.all(
        listUsers.sort((a, b) => {
          const da = new Date(a.registeredAt);
          const db = new Date(b.registeredAt);
          return db - da;
        })
      );
      setListTenLastUsers(orderedUserList);
    }
  }, [listUsers]);

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
              <div className="grid justify-start sm:justify-end gap-2">
                <Datepicker />
              </div>
            </div>
          </div>
          {nbReqBetweenDates && (
            <div className="grid grid-cols-12 gap-6">
              <div className="flex flex-col col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
                <DoughnutCard
                  chartData={chartDataRequestByType}
                  width={389}
                  height={260}
                  title={`${chartDataRequestByType.datasets[0].label} - Total : ${totalRequests}`}
                />
              </div>
              <div className="flex flex-col col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
                <DoughnutCard
                  chartData={chartDataMostViewedFoods}
                  width={788}
                  height={260}
                  title={`${chartDataMostViewedFoods.datasets[0].label} - Total : ${totalMostViewedFoods}`}
                />
              </div>
              <div className="flex flex-col col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
                <DoughnutCard
                  chartData={chartDataMostFavoriteFoods}
                  width={788}
                  height={260}
                  title={`${chartDataMostFavoriteFoods.datasets[0].label} - Total : ${totalCurrentMostFavoriteFoods}`}
                />
              </div>
              <div className="flex flex-col col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
                <DoughnutCard
                  chartData={chartDataFoodTypes}
                  width={389}
                  height={260}
                  title={`${chartDataFoodTypes.datasets[0].label} - Total : ${totalFoodType}`}
                />
              </div>
              <div className="flex flex-col col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
                <DoughnutCard
                  chartData={chartDataAnimalCategories}
                  width={389}
                  height={260}
                  title={`${chartDataAnimalCategories.datasets[0].label} - Total : ${totalAnimalCategories}`}
                />
              </div>
              <div className="flex flex-col col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
                <DoughnutCard
                  chartData={chartDataDevices}
                  width={389}
                  height={260}
                  title={`${chartDataDevices.datasets[0].label} - Total : ${totalDevices}`}
                />
              </div>
              <div className="flex flex-col col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
                <DoughnutCard
                  chartData={chartDataOS}
                  width={389}
                  height={260}
                  title={`${chartDataOS.datasets[0].label} - Total : ${totalOS}`}
                />
              </div>
              <UserTableCard userList={listTenLastUsers} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
