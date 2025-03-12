import { SunMedium } from "lucide-react";

export default function DisplayForecast() {
  return (
    <section className="shadow-2xl shadow-gray-400 border-1 border-gray-200 w-1/2 rounded-2xl px-4 py-6">
      <p className="mb-4 font-medium text-lg">5-Day Forecast</p>
      <div className="flex flex-wrap justify-between">
        {Array(5)
          .fill("")
          .map((_, index) => {
            return (
              <div key={index} className="mx-2 flex flex-col items-center">
                <p className="text-[13px] font-medium">Thu, Mar 13</p>
                <SunMedium className="items-center text-amber-400 h-8 w-max my-4" />
                <p className="text-[16px] font-medium">30°</p>
                <p className="text-[14px] text-gray-400 font-medium">20°</p>
                <p className="text-blue-600 text-[13px] font-medium">39%</p>
              </div>
            );
          })}
      </div>
    </section>
  );
}
