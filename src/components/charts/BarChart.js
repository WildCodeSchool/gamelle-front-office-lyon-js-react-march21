import React, { useRef, useEffect } from 'react';

import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-moment';

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export default function BarChart({ data }) {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    const options = {
      layout: {
        padding: {
          top: 12,
          bottom: 16,
          left: 20,
          right: 20,
        },
      },
      onResize: (chart, size) => {
        const tempChart = chart;
        tempChart.options.scales.x.ticks.display = size.width > 650;
      },
      scales: {
        x: {
          ticks: {
            align: 'center',
            autoSkip: false,
            maxRotation: 0,
            // display: window.screen.width >= 400,
            callback: (label) =>
              data.labels[label]
                .split(' ')
                .map((lab) => lab.trim())
                .filter((l) => l !== ''),
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (val) => val.parsed.y,
          },
        },
      },
      interaction: {
        intersect: false,
        mode: 'nearest',
      },
      animation: {
        duration: 500,
      },
    };

    const chart = new Chart(ctx, {
      type: 'bar',
      data,
      options,
    });
    return () => chart.destroy();
  }, [data]);

  return (
    <div className="flex-grow flex flex-col justify-center">
      <div>
        <canvas ref={canvas} />
      </div>
    </div>
  );
}
