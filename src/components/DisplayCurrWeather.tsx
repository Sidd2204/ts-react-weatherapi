import { Heart } from "lucide-react";
import { WeatherResponse } from "./body";
import { useEffect, useState } from "react";

interface DisplayCurrWeatherProps {
  responseData: WeatherResponse;
  updateFavorite: (currentCity: string) => void;
  favorites: string[];
}

export default function DisplayCurrWeather({
  responseData,
  updateFavorite,
  favorites,
}: DisplayCurrWeatherProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const city: string =
      responseData.location.name + "," + responseData.location.region;

    if (favorites.includes(city)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites]);

  if (!responseData) {
    return <section>Loading...</section>;
  }

  return (
    <section className="bg-[#c4d7fb] dark:bg-[#1b2433] w-full rounded-2xl px-4 py-6 my-10 hover:shadow-xl duration-200">
      <div className="flex items-center">
        <div className="grow">
          <p className="text-[22px] font-medium dark:text-white">
            {responseData.location.name || "New York"}
          </p>
          <p className="text-gray-500 text-[14px] dark:text-gray-400">
            {`${responseData.location.region}, ${responseData.location.country}` ||
              "United States"}
          </p>
        </div>
        <Heart
          className={`dark:text-gray-400 cursor-pointer ${
            isFavorite ? "fill-red-600 stroke-red-600" : "stroke-gray-500"
          }`}
          onClick={() => {
            updateFavorite(
              responseData.location.name + "," + responseData.location.region
            );
            // setIsFavorite(!isFavorite);
          }}
        />
      </div>

      <div className="flex my-6 items-center justify-center">
        {/* <CloudLightning className="w-12 h-max text-purple-400 mr-4" /> */}
        <img
          src={
            responseData.current.condition.icon ||
            "//cdn.weatherapi.com/weather/64x64/day/122.png"
          }
          alt="weather img"
          className="w-16 h-full"
        />

        <div>
          <p className="text-4xl font-light dark:text-white">
            {responseData.current.temp_c || 26}°C
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {responseData.current.condition.text || "Thunderstorm"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#cbe0fd] dark:bg-[#101726] px-4 py-2 rounded-xl">
          <p className="text-[14px] text-gray-500 dark:text-gray-400">
            Humidity
          </p>
          <p className="text-[16px] font-medium dark:text-white">
            {responseData.current.humidity || 75}%
          </p>
        </div>
        <div className="bg-[#cbe0fd] dark:bg-[#101726] px-4 py-2 rounded-xl">
          <p className="text-[14px] text-gray-500 dark:text-gray-400">Wind</p>
          <p className="text-[16px] font-medium dark:text-white">
            {responseData.current.wind_kph || "40"} km/h
          </p>
        </div>
        <div className="bg-[#cbe0fd] dark:bg-[#101726] px-4 py-2 rounded-xl">
          <p className="text-[14px] text-gray-500 dark:text-gray-400">
            Sunrise
          </p>
          <p className="text-[16px] font-medium dark:text-white">
            {responseData.forecast.forecastday[0].astro.sunrise || "00:30 AM"}
          </p>
        </div>
        <div className="bg-[#cbe0fd] dark:bg-[#101726] px-4 py-2 rounded-xl">
          <p className="text-[14px] text-gray-500 dark:text-gray-400">Sunset</p>
          <p className="text-[16px] font-medium dark:text-white">
            {responseData.forecast.forecastday[0].astro.sunset || "16:30 PM"}
          </p>
        </div>
      </div>
    </section>
  );
}
