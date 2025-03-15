import { useEffect, useState } from "react";
import DisplayCurrWeather from "./DisplayCurrWeather";
import DisplayForecast from "./DisplayForecast";
import SearchBar from "./search";
import axios, { AxiosResponse } from "axios";
import Loading from "./Loading";
import FavoritesBar from "./FavoritesBar";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [responseData, setResponseData] = useState<WeatherResponse | null>({
    location: {
      name: "Thane",
      region: "Maharashtra",
      country: "India",
      lat: 19.2,
      lon: 72.9667,
      tz_id: "Asia/Kolkata",
      localtime_epoch: 1741883453,
      localtime: "2025-03-13 22:00",
    },
    current: {
      temp_c: 28.2,
      condition: {
        text: "Mist",
        icon: "//cdn.weatherapi.com/weather/64x64/night/143.png",
        code: 1030,
      },
      wind_kph: 7.6,
      humidity: 79,
    },
    forecast: {
      forecastday: [
        {
          date: "2025-03-13",
          day: {
            maxtemp_c: 36.2,
            mintemp_c: 27.3,
            avghumidity: 41,
            condition: {
              text: "Sunny",
              icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
              code: 1000,
            },
          },
          astro: { sunrise: "06:48 AM", sunset: "06:47 PM" },
        },
        {
          date: "2025-03-14",
          day: {
            maxtemp_c: 36.4,
            mintemp_c: 26.6,
            avghumidity: 33,
            condition: {
              text: "Sunny",
              icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
              code: 1000,
            },
          },
          astro: { sunrise: "06:47 AM", sunset: "06:47 PM" },
        },
        {
          date: "2025-03-15",
          day: {
            maxtemp_c: 35.3,
            mintemp_c: 25.9,
            avghumidity: 40,
            condition: {
              text: "Sunny",
              icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
              code: 1000,
            },
          },
          astro: { sunrise: "06:46 AM", sunset: "06:48 PM" },
        },
      ],
    },
  });

  async function getWeatherData(e: EventTarget): Promise<void> {
    let searchCity: string;

    //set the city to be searched
    if (e instanceof HTMLElement && !e.id) {
      searchCity = e.innerText;
      setCity(searchCity);
    } else {
      searchCity = city;
    }

    //check if the city is already on display
    let responseCity: string | null = null;
    if (responseData) {
      responseCity =
        responseData.location.name + "," + responseData.location.region;
    }

    if (searchCity === responseCity) return;

    setIsLoading(true);
    await axios
      .get<WeatherResponse>(
        `${weatherApiUrl}/forecast.json?key=${weatherApiKey}&q=${searchCity}&days=5&aqi=no&alerts=no`
      )
      .then((response: AxiosResponse<WeatherResponse>) => {
        console.log(response.data);
        setResponseData(response.data);
      })
      .catch((error) => {
        const errorCode = error.response.data.error.code;
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

        setResponseData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function updateFavorite(currentCity: string): void {
    if (favorites.includes(currentCity)) {
      const favs: string[] = favorites.filter((city) => {
        return city !== currentCity;
      });

      setFavorites(favs);

      localStorage.setItem("favorites", JSON.stringify(favs));
    } else {
      const favs: string[] = [...favorites, currentCity];
      setFavorites(favs);

      localStorage.setItem("favorites", JSON.stringify(favs));
    }
  }

  useEffect(() => {
    const favs: string | null = localStorage.getItem("favorites");
    if (!favs) {
      setFavorites([]);
      return;
    }

    setFavorites(JSON.parse(favs));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center w-[90%] lg:w-1/2 m-auto sm">
      <SearchBar
        city={city}
        setCity={setCity}
        getWeatherData={getWeatherData}
      />

      <FavoritesBar
        getWeatherData={getWeatherData}
        favorites={favorites}
        updateFavorite={updateFavorite}
      />

      {responseData ? (
        <>
          <DisplayCurrWeather
            responseData={responseData}
            updateFavorite={updateFavorite}
            favorites={favorites}
          />

          <DisplayForecast responseData={responseData} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
