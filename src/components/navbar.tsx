import { SunMedium } from "lucide-react";

export default function Navbar() {
  return (
    <section className="w-full flex justify-around pt-4">
      <div className="flex gap-1">
        <div className="px-2 rounded-full bg-cyan-100 text-blue-500 font-bold text-xl flex items-center">
          W
        </div>
        <div className="text-xl font-medium flex items-center">WeatherApp</div>
      </div>
      <div className="flex gap-5">
        <div className="flex items-center  text-gray-600 hover:text-black">
          Home
        </div>
        <div className="flex items-center  text-gray-600 hover:text-black">
          Favourites
        </div>
        <div className="border-gray-400 border-1 rounded-full p-1 px-2 hover:bg-gray-200 hover:border-gray-500">
          <SunMedium className="w-4" />
        </div>
      </div>
    </section>
  );
}
