import Home from "./pages/Home";
import Navbar from "./components/navbar";
import Favorites from "./pages/Favorites";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="bg-[#f8fafe] dark:bg-[#080c16] pb-50">
      <Router>
        <Navbar />

        <Routes>
          <Route path={"/:cityparam?"} element={<Home />} />
          <Route path={"/favorites"} element={<Favorites />} />
        </Routes>

        <a
          href="https://www.weatherapi.com/"
          title="Free Weather API"
          className=""
        >
          <img
            src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
            alt="Weather data by WeatherAPI.com"
            className="fixed bottom-7 right-10 w-[80px] sm:w-[100px]"
          />
        </a>
      </Router>
    </div>
  );
}

export default App;
