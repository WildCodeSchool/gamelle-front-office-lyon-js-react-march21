// import FilterButton from "../components/actions/FilterButton";
import Datepicker from '../components/dashboard/Datepicker';
import RequestsByType from '../components/dashboard/RequestsByType';

import '../components/dashboard/css/style.css';

function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Top welcome Banner */}
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
              {/* <FilterButton /> */}
              <Datepicker />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <RequestsByType />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
