import { SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [darkmode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== undefined) {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  function toggleDarkMode() {
    setDarkMode(!darkmode);
  }

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkmode]);

  return (
    <section className="w-full flex justify-around pt-4">
      <div className="flex gap-1 cursor-pointer">
        <div className="px-2 rounded-full bg-cyan-100 text-blue-500 dark:bg-[#0c1a2e] dark:text-[#3399ff] font-bold text-xl flex items-center">
          W
        </div>
        <div className="text-xl font-medium flex items-center dark:dark:text-white">
          WeatherApp
        </div>
      </div>
      <div className="flex gap-5 cursor-pointer">
        <div className="flex items-center  text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200">
          Home
        </div>
        <div className="flex items-center  text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200">
          Favourites
        </div>
        <div
          className="border-gray-400 border-1 rounded-full p-1 px-2 hover:bg-gray-200 hover:border-gray-500 dark:text-white dark:border-gray-800 dark:hover:bg-[#1f2a3d] dark:hover:border-gray-800"
          onClick={toggleDarkMode}
        >
          <SunMedium className="w-4" />
        </div>
      </div>
    </section>
  );
}
