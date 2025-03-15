import { Star, X } from "lucide-react";

interface FavoritesBarProps {
  favorites: string[];
  getWeatherData: (e: EventTarget) => void;
  updateFavorite: (currentCity: string) => void;
}

export default function FavoritesBar({
  favorites,
  getWeatherData,
  updateFavorite,
}: FavoritesBarProps) {
  return (
    <section
      className={`shadow-gray-200 w-full border-1 border-gray-200 dark:text-white bg-white dark:bg-[#0d1322]  dark:border-gray-800  duration-200 rounded-2xl px-4 mt-10 py-6 transition-all transform ${
        favorites.length === 0 ? "hidden" : ""
      }`}
    >
      <div className="flex gap-1 items-center w-full text-lg font-medium">
        <Star className="text-amber-500 w-5" />
        Favorites
      </div>
      <div className="mt-4 flex gap-3 flex-wrap">
        {favorites.map((city, index) => {
          return (
            <div
              className="cursor-pointer flex border-1 border-gray-200 bg-[#f9f9f9] px-3 rounded-full hover:scale-102 dark:bg-[#1a2134] dark:border-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
              key={index}
            >
              <X
                className="w-3 hover:text-red-600"
                onClick={() => {
                  updateFavorite(city);
                }}
              />
              <div
                className="text-sm mx-1"
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                  getWeatherData(e.target)
                }
              >
                {city}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
