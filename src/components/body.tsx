import DisplayCurrWeather from "./DisplayCurrWeather";
import DisplayForecast from "./DisplayForecast";
import SearchBar from "./search";

export default function MainBody() {
  return (
    <div className="flex flex-col items-center w-[90%] lg:w-1/2 m-auto sm">
      <SearchBar />
      <DisplayCurrWeather />
      <DisplayForecast />
    </div>
  );
}
