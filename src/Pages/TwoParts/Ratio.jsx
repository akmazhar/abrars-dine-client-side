import { useEffect, useState } from "react";
import moment from "moment";
import { BarChart } from "keep-react";

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

const Ratio = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [currentTime, setCurrentTime] = useState(moment());

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

  const filterButtons = [
    { id: "all", label: "All Days" },
    { id: "first", label: "First Half" },
    { id: "second", label: "Second Half" },
  ];

  return (
    <section className="min-h-screen bg-[#F5F1E8] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4A853]/40 bg-white px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#174C3A]"></span>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#174C3A]">
                Abrar's Dine Analytics
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#24382E] sm:text-4xl lg:text-5xl">
              Sales <span className="text-[#174C3A]">&</span> Revenue
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#68766C] sm:text-base">
              Monitor your restaurant's price performance and sales activity
              through a clear visual overview.
            </p>
          </div>

          {/* Date and Time */}
          <div className="rounded-2xl border border-[#D4A853]/30 bg-white px-5 py-4 shadow-[0_8px_30px_rgba(36,56,46,0.06)]">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#8A958C]">
              Current Date & Time
            </p>

            <p className="text-lg font-bold text-[#174C3A] sm:text-xl">
              {currentTime.format("DD MMMM, YYYY")}
            </p>

            <p className="mt-1 text-sm font-medium text-[#68766C]">
              {currentTime.format("hh:mm:ss A")}
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Price Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-[#D4A853]/25 bg-white p-6 shadow-[0_10px_35px_rgba(36,56,46,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(36,56,46,0.12)] sm:p-7">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#D4A853]/10 transition-transform duration-500 group-hover:scale-150"></div>

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#68766C]">
                  Total Price Value
                </p>

                <h2 className="mt-3 text-3xl font-extrabold text-[#24382E] sm:text-4xl">
                  {totalPrice.toLocaleString()}
                </h2>

                <p className="mt-2 text-xs font-medium text-[#8A958C]">
                  Combined price indicator
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F1E8] text-2xl text-[#B58A42]">
                ৳
              </div>
            </div>
          </div>

          {/* Sales Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-[#174C3A]/10 bg-[#174C3A] p-6 shadow-[0_10px_35px_rgba(23,76,58,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(23,76,58,0.2)] sm:p-7">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150"></div>

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white/70">
                  Total Sales Value
                </p>

                <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                  {totalSell.toLocaleString()}
                </h2>

                <p className="mt-2 text-xs font-medium text-white/60">
                  Combined sales indicator
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl text-[#E8C77D]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3v18h18M7 14l4-4 4 3 5-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="overflow-hidden rounded-3xl border border-[#D4A853]/25 bg-white shadow-[0_15px_45px_rgba(36,56,46,0.07)]">
          {/* Chart Header */}
          <div className="flex flex-col gap-5 border-b border-[#E9E5DC] px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-[#24382E] sm:text-2xl">
                Price & Sales Overview
              </h2>

              <p className="mt-1 text-sm text-[#8A958C]">
                Compare daily price and sales performance
              </p>
            </div>

            {/* Premium Filter Buttons */}
            <div className="flex flex-wrap gap-2 rounded-2xl bg-[#F5F1E8] p-1.5">
              {filterButtons.map((button) => (
                <button
                  key={button.id}
                  onClick={() => setSelectedPeriod(button.id)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-300 sm:px-5 sm:text-sm ${
                    selectedPeriod === button.id
                      ? "bg-[#174C3A] text-white shadow-lg shadow-[#174C3A]/20"
                      : "bg-transparent text-[#59665D] hover:bg-white hover:text-[#174C3A]"
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-[#174C3A]"></span>
                <span className="text-sm font-semibold text-[#59665D]">
                  Price
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-[#D4A853]"></span>
                <span className="text-sm font-semibold text-[#59665D]">
                  Sell
                </span>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <div className="min-w-[600px]">
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

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#E9E5DC] pt-5">
              <p className="text-xs font-medium text-[#8A958C]">
                Showing {filteredData.length} data points
              </p>

              <span className="rounded-full border border-[#D4A853]/30 bg-[#F5F1E8] px-4 py-2 text-xs font-bold text-[#174C3A]">
                {selectedPeriod === "all"
                  ? "Full Month"
                  : selectedPeriod === "first"
                    ? "First Half"
                    : "Second Half"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-7 text-center">
          <p className="text-xs font-medium tracking-wide text-[#8A958C]">
            © {currentTime.format("YYYY")} Abrar's Dine. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Ratio;
