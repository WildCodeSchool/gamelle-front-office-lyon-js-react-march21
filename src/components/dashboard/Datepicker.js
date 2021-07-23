import { useContext, useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import { StatsContext } from '../../contexts/StatsContext';

import 'flatpickr/dist/themes/material_green.css';

export default function Datepicker() {
  const { setStatsStartDate, setStatsEndDate } = useContext(StatsContext);
  const [chosenDates, setChosenDates] = useState(null);

  const options = {
    mode: 'range',
    static: true,
    monthSelectorType: 'static',
    dateFormat: 'd M Y',
    defaultDate: [
      new Date(new Date().setDate(new Date().getDate() - 6)),
      new Date(),
    ],
    prevArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    onReady: (selectedDates, dateStr, instance) => {
      // eslint-disable-next-line no-param-reassign
      instance.element.value = dateStr.replace('to', '-');
      setChosenDates(selectedDates);
    },
    onChange: (selectedDates, dateStr, instance) => {
      // eslint-disable-next-line no-param-reassign
      instance.element.value = dateStr.replace('to', '-');
      setChosenDates(selectedDates);
    },
  };

  const handleClickDates = async () => {
    const tempStartDate = chosenDates[0];
    const tempEndDate =
      chosenDates.length === 2 ? chosenDates[1] : chosenDates[0];
    setStatsStartDate(new Date(tempStartDate.setHours(0, 0, 0, 0)));
    setStatsEndDate(
      new Date(
        new Date(tempEndDate.setDate(tempEndDate.getDate() + 1)).setHours(
          0,
          0,
          0,
          0
        )
      )
    );
  };

  useEffect(() => {
    if (chosenDates) {
      const tempStartDate = chosenDates[0];
      const tempEndDate =
        chosenDates.length === 2 ? chosenDates[1] : chosenDates[0];
      setStatsStartDate(new Date(tempStartDate.setHours(0, 0, 0, 0)));
      setStatsEndDate(
        new Date(
          new Date(tempEndDate.setDate(tempEndDate.getDate() + 1)).setHours(
            0,
            0,
            0,
            0
          )
        )
      );

      handleClickDates();
    }
  }, [chosenDates]);

  return (
    <div className="relative flex items-center">
      <div>
        <Flatpickr
          className="w-60 bg-white border mr-2 py-2 pl-9 rounded-lg border-gray-200 hover:border-gray-500 shadow-sm text-sm placeholder-gray-400 text-gray-500 hover:text-gray-800 font-medium focus:border-gray-300 focus:outline-none"
          options={options}
          value={chosenDates}
        />
        <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 fill-current text-gray-500 ml-3"
            viewBox="0 0 16 16"
          >
            <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
          </svg>
        </div>
      </div>
      <button
        type="button"
        className="border-2 px-2 py-1 bg-blue-500 border-gray-200 rounded-lg text-white shadow-sm focus:outline-none"
        aria-label="datesValidation"
        onClick={() => handleClickDates()}
      >
        Valider
      </button>
    </div>
  );
}
