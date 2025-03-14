import { Search } from "lucide-react";

interface SearchBarProps {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  getWeatherData: (e: EventTarget) => void;
}

export default function SearchBar({
  city,
  setCity,
  getWeatherData,
}: SearchBarProps) {
  return (
    <div className="relative mt-20 w-[70%]">
      <Search className="absolute top-[31%] left-[3%] w-5 text-gray-400" />
      <input
        className="w-full shadow-lg rounded-4xl px-10 py-4 text-med shadow-gray-300 bg-white border-gray-200 border-1 outline-0 dark:bg-[#080c16] dark:shadow-none dark:text-white dark:border-gray-800 focus:border-blue-400 transition duration-300"
        placeholder="Search for a city"
        name="city"
        value={city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCity(e.target.value);
        }}
      />
      <button
        className="bg-[#3366ff] text-white rounded-4xl px-3 py-1 absolute right-[3%] top-[24%] hover:bg-[#3381ff] hover:scale-x-102 active:bg-[#3352ff] duration-150 disabled:bg-[#3366ff6c] disabled:text-gray-400 cursor-pointer"
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          getWeatherData(e.target)
        }
        id="citySearchButton"
        disabled={city.length === 0}
      >
        Search
      </button>
    </div>
  );
}
