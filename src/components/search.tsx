import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative mt-20 md:w-1/3">
      <input
        className="w-full shadow-lg rounded-4xl px-10 py-3 text-sm shadow-gray-300 bg-gray-100 border-gray-200 border-1 outline-0 dark:bg-[#080c16] dark:shadow-none dark:text-white dark:border-gray-800 focus:border-blue-400 transition duration-300"
        placeholder="Search for a city"
      />
      <Search className="absolute top-[10px] left-[14px] w-5 text-gray-400" />
    </div>
  );
}
