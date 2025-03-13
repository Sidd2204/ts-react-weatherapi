// import { SunMedium } from "lucide-react";
import { WeatherResponse } from "./body";

interface DisplayForecastProps {
  responseData: WeatherResponse;
}

export default function DisplayForecast({
  responseData,
}: DisplayForecastProps) {
  // const forecastData = Array(3).fill("");

  if (!responseData) {
    return <section>Loading...</section>;
  }

  return (
    <section className="shadow-gray-200 w-full border-1 border-gray-200 dark:text-white dark:bg-[#0d1322] dark:hover:shadow-none dark:border-gray-800 hover:shadow-lg duration-200 rounded-2xl px-4 py-6">
      <p className="mb-4 font-medium text-lg">
        {responseData.forecast.forecastday.length}-Day Forecast
      </p>
      <div className="flex flex-wrap justify-evenly">
        {responseData.forecast.forecastday.map((day, index) => {
          return (
            <div
              key={index}
              className="mx-2 flex flex-col items-center dark:bg-[#0b1120] hover:scale-102 duration-200"
            >
              <p className="text-[13px] font-medium">{day.date}</p>
              {/* <SunMedium className="items-center text-amber-400 h-8 w-max my-4" /> */}
              <img
                src={
                  day.day.condition.icon ||
                  "//cdn.weatherapi.com/weather/64x64/day/122.png"
                }
                alt="weather img"
                className="w-16 h-full"
              />
              <p className="text-[16px] font-medium">
                {day.day.maxtemp_c || 30}°
              </p>
              <p className="text-[14px] text-gray-400 font-medium">
                {day.day.mintemp_c || 30}°
              </p>
              <p className="text-blue-600 text-[13px] font-medium">
                {day.day.avghumidity || 40}%
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
