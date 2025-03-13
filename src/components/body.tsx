import { useState } from "react";
import DisplayCurrWeather from "./DisplayCurrWeather";
import DisplayForecast from "./DisplayForecast";
import SearchBar from "./search";
import axios from "axios";
const weatherApiUrl = import.meta.env.VITE_WEATHER_API_URL;
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

export interface WeatherResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    humidity: number;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

type ForecastDay = {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avghumidity: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
  astro: { sunrise: string; sunset: string };
};

export default function MainBody() {
  const [city, setCity] = useState<string>("");
  const [responseData, setResponseData] = useState<WeatherResponse | null>(
    null
  );

  async function getWeatherData() {
    await axios
      .get(
        `${weatherApiUrl}/forecast.json?key=${weatherApiKey}&q=${city}&days=5&aqi=no&alerts=no`
      )
      .then((response) => {
        console.log(response.data);
        setResponseData(response.data);
      })
      .catch((error) => {
        const errorCode = error.response.data.error.code;
        // const errorMessage = error.response.data.error.message;
        if (errorCode == 1006) {
          alert("Location not found, try entering City,State");
        } else if (errorCode == 2006) {
          alert("Key invalid!");
        } else if (errorCode == 2007) {
          alert("Services temporarily down, try again later :D");
        } else if (errorCode == 2008) {
          alert("Key disabled");
        } else if (errorCode == 2009) {
          alert("Request out of current access domain");
        } else {
          alert(
            `Code: ${error.response.data.error.code},\nMessage: ${error.response.data.error.message}`
          );
        }
      });
  }

  // if (!responseData) {
  //   return <section className="dark:text-white">Loading...</section>;
  // }

  return (
    <div className="flex flex-col items-center w-[90%] lg:w-1/2 m-auto sm">
      <SearchBar
        city={city}
        setCity={setCity}
        getWeatherData={getWeatherData}
      />
      {responseData ? (
        <>
          <DisplayCurrWeather responseData={responseData} />
          <DisplayForecast responseData={responseData} />
        </>
      ) : null}
    </div>
  );
}
