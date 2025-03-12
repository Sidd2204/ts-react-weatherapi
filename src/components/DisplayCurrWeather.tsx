import { CloudLightning, Heart } from "lucide-react";

export default function DisplayCurrWeather() {
  return (
    <section className="bg-[#c9cdd4] w-1/2 rounded-2xl px-4 py-6 my-10">
      <div className="flex items-center">
        <div className="grow">
          <p className="text-[22px] font-medium">New York</p>
          <p className="text-gray-500 text-[14px]">United States</p>
        </div>
        <Heart className="text-gray-500" />
      </div>

      <div className="flex my-6 items-center justify-center">
        <CloudLightning className="w-12 h-max text-purple-400 mr-4" />

        <div>
          <p className="text-4xl font-light">{26}°</p>
          <p className="text-sm text-gray-500">Thunderstorm</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#dde0e5] px-4 py-2 rounded-xl">
          <p className="text-[14px] text-gray-500">Humidity</p>
          <p className="text-[16px] font-medium">75%</p>
        </div>
        <div className="bg-[#dde0e5] px-4 py-2 rounded-xl">
          <p className="text-[14px] text-gray-500">Wind</p>
          <p className="text-[16px] font-medium">32 km/h</p>
        </div>
        <div className="bg-[#dde0e5] px-4 py-2 rounded-xl">
          <p className="text-[14px] text-gray-500">Sunrise</p>
          <p className="text-[16px] font-medium">06:30 AM</p>
        </div>
        <div className="bg-[#dde0e5] px-4 py-2 rounded-xl">
          <p className="text-[14px] text-gray-500">Sunset</p>
          <p className="text-[16px] font-medium">08:15 PM</p>
        </div>
      </div>
    </section>
  );
}
