import { Link } from "react-router-dom";

const FoodCard = ({ service }) => {
  const { _id, image, name, category, price } = service;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[#D4A853]/20 bg-white shadow-[0_10px_35px_rgba(36,56,46,0.07)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4A853]/50 hover:shadow-[0_22px_50px_rgba(23,76,58,0.15)]">
      {/* Food Image */}
      <div className="relative h-60 overflow-hidden bg-[#F5F1E8] sm:h-64">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#24382E]/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80"></div>

        {/* Category Badge */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#174C3A] shadow-lg backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#D4A853]"></span>
            {category}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4 rounded-2xl border border-white/30 bg-[#174C3A]/95 px-5 py-3 shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">
            Price
          </p>

          <p className="mt-0.5 text-xl font-extrabold text-[#E8C77D]">
            $ {price}
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Food Name */}
        <div className="mb-3">
          <h2 className="line-clamp-1 text-xl font-extrabold tracking-tight text-[#24382E] transition-colors duration-300 group-hover:text-[#174C3A] sm:text-2xl">
            {name}
          </h2>

          <div className="mt-3 flex items-center gap-2">
            <span className="h-[2px] w-8 rounded-full bg-[#D4A853] transition-all duration-300 group-hover:w-14"></span>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A958C]">
              {category} Cuisine
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mb-6 text-sm leading-6 text-[#68766C]">
          Discover the delightful taste and unique flavours of our carefully
          selected {name}.
        </p>

        {/* Details Button */}
        <div className="mt-auto">
          <Link
            to={`/details/${_id}`}
            className="group/button flex w-full items-center justify-between rounded-2xl bg-[#174C3A] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#174C3A]/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#22664D] hover:shadow-xl hover:shadow-[#174C3A]/25 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#D4A853] focus:ring-offset-2"
          >
            <span>Explore Details</span>

            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 group-hover/button:translate-x-1 group-hover/button:bg-[#D4A853] group-hover/button:text-[#24382E]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14m-6-6 6 6-6 6"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom Gold Accent */}
      <div className="h-1 w-0 bg-gradient-to-r from-[#174C3A] via-[#D4A853] to-[#174C3A] transition-all duration-500 group-hover:w-full"></div>
    </div>
  );
};

export default FoodCard;
