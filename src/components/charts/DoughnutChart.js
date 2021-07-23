import React, { useRef, useEffect } from 'react';

import {
  Chart,
  DoughnutController,
  ArcElement,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-moment';

Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip, Legend);

export default function DoughnutChart({ data, width, height }) {
  const canvas = useRef(null);
  const legend = useRef(null);
  useEffect(() => {
    const ctx = canvas.current;
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data,
      options: {
        cutout: '60%', // largeur du trou du donut
        layout: {
          padding: 10, // padding de l'intérieur de la box
        },
        plugins: {
          legend: {
            display: false,
            position: 'right',
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: {
          duration: 500,
        },
        maintainAspectRatio: false,
      },
      plugins: [
        {
          id: 'htmlLegend',
          afterUpdate(c) {
            const ul = legend.current;
            if (!ul) return;
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            // Reuse the built-in legendItems generator
            const items = c.options.plugins.legend.labels.generateLabels(c);

            items.forEach((item) => {
              const li = document.createElement('li');
              li.style.margin = 1;

              // Button element
              const button = document.createElement('button');
              button.classList.add(
                'font-medium',
                'text-sm',
                'inline-flex',
                'items-center',
                'justify-center',
                'border',
                'border-gray-300',
                'rounded',
                'shadow-md',
                'transition',
                'duration-150',
                'ease-in-out',
                'px-2',
                'py-0.5',
                'm-1',
                'focus:outline-none'
              );
              button.style.opacity = item.hidden ? '.3' : '';
              button.onclick = () => {
                c.toggleDataVisibility(item.index, !item.index);
                c.update();
              };

              // Color box
              const box = document.createElement('span');
              box.classList.add(
                'block',
                'w-10',
                'h-2',
                'mr-2',
                'rounded-sm',
                'mr-1',
                'pointer-events-none'
              );
              box.style.backgroundColor = item.fillStyle;

              // Label
              const label = document.createElement('span');
              label.style.display = 'flex';
              label.style.alignItems = 'center';
              const labelText = document.createTextNode(
                `${item.text} : ${data.datasets[0].data[item.index]}`
              );
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          },
        },
      ],
    });
    return () => chart.destroy();
  }, [data]);

  return (
    <div className="flex-grow flex flex-col justify-center">
      <div>
        <canvas ref={canvas} width={width} height={height} />
      </div>
      <div className="px-5 pt-2 pb-6">
        <ul ref={legend} className="flex flex-wrap justify-center -m-1" />
      </div>
    </div>
  );
}
