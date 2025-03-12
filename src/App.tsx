import MainBody from "./components/body";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="min-h-[150vh] dark:bg-[#080c16]">
      <Navbar />
      <MainBody />
    </div>
  );
}

export default App;
