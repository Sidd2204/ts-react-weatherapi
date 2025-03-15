import { useEffect, useState } from "react";
import DisplayCurrWeather from "../components/DisplayCurrWeather";
import DisplayForecast from "../components/DisplayForecast";
import SearchBar from "../components/search";
import axios, { AxiosResponse } from "axios";
import Loading from "../components/Loading";
import FavoritesBar from "../components/FavoritesBar";
import { useParams } from "react-router-dom";
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

export default function Home() {
  const { cityparam } = useParams();
  const [city, setCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [responseData, setResponseData] = useState<WeatherResponse | null>(
    null
  );

  async function getWeatherData(searchCity: string): Promise<void> {
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

  //Fetch favorites
  useEffect(() => {
    const favs: string | null = localStorage.getItem("favorites");
    if (!favs) {
      setFavorites([]);
      return;
    }

    setFavorites(JSON.parse(favs));
  }, []);

  //Make API call if param exists
  useEffect(() => {
    if (!cityparam) return;
    setCity(cityparam);
    getWeatherData(cityparam);
  }, [cityparam]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center w-[90%] lg:w-[768px] m-auto sm">
      <SearchBar city={city} setCity={setCity} />

      <FavoritesBar favorites={favorites} updateFavorite={updateFavorite} />

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
