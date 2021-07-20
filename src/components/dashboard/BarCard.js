import BarChart from '../charts/BarChart';

export default function BarCard({ chartData, width, height, title }) {
  return (
    <>
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">{title}</h2>
      </header>
      <BarChart data={chartData} width={width} height={height} />
    </>
  );
}
