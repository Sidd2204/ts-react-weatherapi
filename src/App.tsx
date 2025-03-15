import Home from "./pages/Home";
import Navbar from "./components/navbar";
import Favorites from "./pages/Favorites";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-[150vh] bg-[#f8fafe] dark:bg-[#080c16]">
      <Router>
        <Navbar />

        <Routes>
          <Route path={"/:cityparam?"} element={<Home />} />
          <Route path={"/favorites"} element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
