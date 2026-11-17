import { useEffect, useState } from "react";
import moment from "moment";
import { BarChart } from "keep-react";
import {
  FiActivity,
  FiCalendar,
  FiTrendingUp,
  FiBarChart2,
  FiArrowUpRight,
  FiClock,
} from "react-icons/fi";

const BarChartData = [
  { name: "02", price: 340, sell: 140 },
  { name: "04", price: 300, sell: 200 },
  { name: "06", price: 170, sell: 120 },
  { name: "08", price: 190, sell: 130 },
  { name: "10", price: 450, sell: 120 },
  { name: "12", price: 400, sell: 213 },
  { name: "14", price: 250, sell: 180 },
  { name: "16", price: 320, sell: 150 },
  { name: "18", price: 280, sell: 160 },
  { name: "20", price: 390, sell: 110 },
  { name: "22", price: 220, sell: 90 },
  { name: "24", price: 360, sell: 170 },
  { name: "26", price: 410, sell: 140 },
  { name: "28", price: 280, sell: 200 },
  { name: "30", price: 330, sell: 160 },
];

const filterButtons = [
  { id: "all", label: "All Days" },
  { id: "first", label: "First Half" },
  { id: "second", label: "Second Half" },
];

const Ratio = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [currentTime, setCurrentTime] = useState(() => moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredData =
    selectedPeriod === "first"
      ? BarChartData.slice(0, 8)
      : selectedPeriod === "second"
        ? BarChartData.slice(8)
        : BarChartData;

  const totalPrice = filteredData.reduce(
    (total, item) => total + item.price,
    0,
  );

  const totalSell = filteredData.reduce((total, item) => total + item.sell, 0);

  const averagePrice = filteredData.length
    ? totalPrice / filteredData.length
    : 0;

  const formattedNumber = (value) =>
    value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  const periodLabel =
    selectedPeriod === "all"
      ? "Full Month"
      : selectedPeriod === "first"
        ? "First Half"
        : "Second Half";

  return (
    <main className="min-h-screen bg-[#F5F1E8] px-4 py-7 font-sans sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Dashboard Header */}
        <header className="mb-9">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4A853]/30 bg-white px-4 py-2 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#174C3A] opacity-30"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#174C3A]"></span>
                </span>

                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#174C3A] sm:text-xs">
                  Abrar's Dine / Analytics
                </span>
              </div>

              <h1 className="text-3xl font-black leading-tight tracking-tight text-[#183D30] sm:text-4xl lg:text-5xl">
                Sales & Revenue
                <span className="ml-2 text-[#B58A42]">Overview.</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#78847B] sm:text-base">
                Your restaurant performance at a glance. Track price indicators,
                monitor sales activity and understand your business performance.
              </p>
            </div>

            {/* Live Date & Time */}
            <div className="flex items-center gap-4 rounded-2xl border border-[#E6DFD1] bg-white p-4 shadow-[0_8px_30px_rgba(24,61,48,0.05)] sm:min-w-[260px]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F5F1E8] text-xl text-[#B58A42]">
                <FiCalendar />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9AA49C]">
                  Current Date & Time
                </p>

                <p className="mt-1 text-base font-extrabold text-[#174C3A]">
                  {currentTime.format("DD MMMM, YYYY")}
                </p>

                <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#879188]">
                  <FiClock className="text-[#B58A42]" />
                  {currentTime.format("hh:mm:ss A")}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Overview Label */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-[#24382E]">
              Performance Summary
            </h2>
            <p className="mt-1 text-xs text-[#929B93]">
              Key business indicators for {periodLabel.toLowerCase()}
            </p>
          </div>

          <span className="hidden items-center gap-2 rounded-full bg-[#174C3A]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#174C3A] sm:inline-flex">
            <FiActivity />
            Overview
          </span>
        </div>

        {/* Statistics Cards */}
        <section className="mb-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Price */}
          <article className="group relative overflow-hidden rounded-3xl border border-[#E9DFCA] bg-white p-6 shadow-[0_8px_30px_rgba(24,61,48,0.045)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(24,61,48,0.09)] sm:p-7">
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#D4A853]/10 transition-transform duration-500 group-hover:scale-125"></div>

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F1E8] text-2xl font-bold text-[#B58A42]">
                  ৳
                </div>

                <span className="rounded-full bg-[#F5F1E8] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#9B783C]">
                  Price
                </span>
              </div>

              <p className="mt-6 text-sm font-semibold text-[#849087]">
                Total Price Value
              </p>

              <h3 className="mt-2 break-words text-3xl font-black tracking-tight text-[#183D30] sm:text-4xl">
                {formattedNumber(totalPrice)}
              </h3>

              <div className="mt-5 flex items-center justify-between border-t border-[#F0ECE3] pt-4">
                <span className="text-xs font-medium text-[#9AA49C]">
                  Combined price indicator
                </span>
                <FiArrowUpRight className="text-lg text-[#B58A42]" />
              </div>
            </div>
          </article>

          {/* Total Sales */}
          <article className="group relative overflow-hidden rounded-3xl bg-[#174C3A] p-6 shadow-[0_10px_35px_rgba(23,76,58,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(23,76,58,0.2)] sm:p-7">
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-125"></div>

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl text-[#E8C77D]">
                  <FiTrendingUp />
                </div>

                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#E8C77D]">
                  Sales
                </span>
              </div>

              <p className="mt-6 text-sm font-semibold text-white/65">
                Total Sales Value
              </p>

              <h3 className="mt-2 break-words text-3xl font-black tracking-tight text-white sm:text-4xl">
                {formattedNumber(totalSell)}
              </h3>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs font-medium text-white/50">
                  Combined sales indicator
                </span>
                <FiArrowUpRight className="text-lg text-[#E8C77D]" />
              </div>
            </div>
          </article>

          {/* Average Price */}
          <article className="group relative overflow-hidden rounded-3xl border border-[#E9DFCA] bg-white p-6 shadow-[0_8px_30px_rgba(24,61,48,0.045)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(24,61,48,0.09)] sm:col-span-2 lg:col-span-1 sm:p-7">
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#174C3A]/5 transition-transform duration-500 group-hover:scale-125"></div>

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF1ED] text-xl text-[#174C3A]">
                  <FiBarChart2 />
                </div>

                <span className="rounded-full bg-[#EAF1ED] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#174C3A]">
                  Average
                </span>
              </div>

              <p className="mt-6 text-sm font-semibold text-[#849087]">
                Average Price Value
              </p>

              <h3 className="mt-2 break-words text-3xl font-black tracking-tight text-[#183D30] sm:text-4xl">
                {formattedNumber(averagePrice)}
              </h3>

              <div className="mt-5 flex items-center justify-between border-t border-[#F0ECE3] pt-4">
                <span className="text-xs font-medium text-[#9AA49C]">
                  Average per data point
                </span>
                <FiActivity className="text-lg text-[#174C3A]" />
              </div>
            </div>
          </article>
        </section>

        {/* Chart Section */}
        <section className="overflow-hidden rounded-3xl border border-[#E7DFD0] bg-white shadow-[0_12px_40px_rgba(24,61,48,0.055)]">
          {/* Chart Header */}
          <div className="border-b border-[#F0ECE3] px-5 py-6 sm:px-8 sm:py-7">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-7 rounded-full bg-[#B58A42]"></span>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#B58A42]">
                    Visual Analytics
                  </span>
                </div>

                <h2 className="text-xl font-black tracking-tight text-[#183D30] sm:text-2xl">
                  Price & Sales Performance
                </h2>

                <p className="mt-2 text-xs leading-6 text-[#929B93] sm:text-sm">
                  Compare daily price indicators and sales activity throughout
                  the selected period.
                </p>
              </div>

              {/* Filter Controls */}
              <div className="flex w-full flex-wrap gap-1.5 rounded-2xl bg-[#F5F1E8] p-1.5 sm:w-fit">
                {filterButtons.map((button) => (
                  <button
                    key={button.id}
                    type="button"
                    onClick={() => setSelectedPeriod(button.id)}
                    aria-pressed={selectedPeriod === button.id}
                    className={`flex-1 whitespace-nowrap rounded-xl px-3 py-2.5 text-xs font-bold transition-all duration-300 sm:flex-none sm:px-5 sm:text-sm ${
                      selectedPeriod === button.id
                        ? "bg-[#174C3A] text-white shadow-md shadow-[#174C3A]/15"
                        : "text-[#69766D] hover:bg-white hover:text-[#174C3A]"
                    }`}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Body */}
          <div className="p-4 sm:p-7 lg:p-8">
            {/* Chart Legend */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-sm bg-[#174C3A]"></span>
                  <span className="text-xs font-bold text-[#59665D]">
                    Price
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-sm bg-[#D4A853]"></span>
                  <span className="text-xs font-bold text-[#59665D]">Sell</span>
                </div>
              </div>

              <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#9AA49C]">
                <FiActivity className="text-[#174C3A]" />
                Daily Comparison
              </span>
            </div>

            {/* Responsive Chart */}
            <div className="w-full overflow-x-auto rounded-2xl bg-[#FCFBF8] p-2 sm:p-4">
              <div className="min-w-[560px]">
                <BarChart
                  height={350}
                  width="100%"
                  barSize={22}
                  barRadius={[6, 6, 0, 0]}
                  dataKey="price"
                  secondaryDataKey="sell"
                  chartData={filteredData}
                  showBg={true}
                  showLegend={true}
                  showTooltip={true}
                  showXaxis={true}
                  showYaxis={true}
                />
              </div>
            </div>

            {/* Chart Footer */}
            <div className="mt-6 flex flex-col justify-between gap-4 border-t border-[#F0ECE3] pt-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold text-[#344B3E]">
                  {filteredData.length} Data Points
                </p>
                <p className="mt-1 text-xs text-[#9AA49C]">
                  Based on the selected reporting period
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full border border-[#D4A853]/30 bg-[#F5F1E8] px-4 py-2 text-xs font-bold text-[#174C3A]">
                  {periodLabel}
                </span>

                <span className="rounded-full bg-[#EAF1ED] px-4 py-2 text-xs font-bold text-[#174C3A]">
                  {filteredData.length} Days
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Ratio;
