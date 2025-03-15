import { MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const favs: null | string = localStorage.getItem("favorites");
    if (!favs) return;
    setFavorites(JSON.parse(favs));
  }, []);

  return (
    <section className="w-[90%] lg:w-1/2 m-auto mt-10">
      <div className="flex gap-2 w-full items-center justify-center">
        <Star className="text-amber-400 h-full w-7" />
        <p className="text-2xl font-bold dark:text-white">
          Saved Favorite Locations
        </p>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-8">
        {favorites.map((city, index) => {
          return (
            <div
              className="bg-white px-4 py-6 flex gap-2 flex-wrap items-center rounded-xl border-1 border-gray-200 dark:bg-[#0D1322] dark:border-gray-800 dark:text-white "
              key={index}
            >
              <MapPin className="text-blue-500 " />
              <p className="text-lg font-medium">{city}</p>
              <p
                className="text-gray-400 w-full text-sm pl-2 hover:text-blue-600 hover:underline cursor-pointer"
                onClick={() => {
                  navigate(`/${city}`);
                }}
              >
                Click To View Weather Data
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
