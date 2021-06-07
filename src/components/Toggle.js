/* eslint-disable */
import { useTheme } from 'react-hook-tailwind-darkmode';

function Toggle() {
  const { changeTheme } = useTheme();
  return (
    <div>
      <label for="toogleA" class="flex items-center cursor-pointer">
        <div class="relative">
          <input
            onClick={() => changeTheme()}
            id="toogleA"
            type="checkbox"
            class="sr-only"
          />

          <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>

          <div class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>

        <div class="ml-3 text-gray-700 font-medium"></div>
      </label>
    </div>
  );
}
export default Toggle;
