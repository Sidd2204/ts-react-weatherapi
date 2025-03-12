import { SunMedium } from "lucide-react";

export default function DisplayForecast() {
  return (
    <section className="shadow-gray-200 w-full border-1 border-gray-200 dark:text-white dark:bg-[#0d1322] dark:shadow-none dark:border-gray-800 hover:shadow-lg duration-200 rounded-2xl px-4 py-6">
      <p className="mb-4 font-medium text-lg">5-Day Forecast</p>
      <div className="flex flex-wrap justify-between">
        {Array(5)
          .fill("")
          .map((_, index) => {
            return (
              <div
                key={index}
                className="mx-2 flex flex-col items-center dark:bg-[#0b1120] hover:scale-102 duration-200"
              >
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
