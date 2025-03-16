import axios from "axios";

interface reqParams {
  query: { city: string };
}

interface WeatherResponse {
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

export default async function getWeatherData(
  req: reqParams,
  res: any
): Promise<void> {
  const { city } = req.query;
  console.log("City: ", city);

  try {
    const weatherApiUrl = process.env.VITE_WEATHER_API_URL;
    const weatherApiKey = process.env.VITE_WEATHER_API_KEY;

    await axios
      .get<WeatherResponse>(
        `${weatherApiUrl}/forecast.json?key=${weatherApiKey}&q=${city}&days=5&aqi=no&alerts=no`
      )
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          res
            .status(error.response.status)
            .json(error.response.data.error.message);
        } else {
          res
            .status(500)
            .json({ message: "No error response, something went wrong" });
        }
      });
  } catch (error) {
    console.log("\n\n\nError: \n", error);
  }
}
