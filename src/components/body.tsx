import DisplayCurrWeather from "./DisplayCurrWeather";
import DisplayForecast from "./DisplayForecast";
import SearchBar from "./search";

export default function MainBody() {
  return (
    <div className="flex flex-col items-center">
      <SearchBar />
      <DisplayCurrWeather />
      <DisplayForecast />
    </div>
  );
}
