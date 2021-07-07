import DoughnutChart from '../charts/DoughnutChart';

export default function DoughnutCard({ chartData, width, height, title }) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">{title}</h2>
      </header>
      <DoughnutChart data={chartData} width={width} height={height} />
    </div>
  );
}
