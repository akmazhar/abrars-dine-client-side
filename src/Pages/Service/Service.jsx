import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodCard from "../FoodCard/FoodCard";

const Service = () => {
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  // Fetch Featured Food Items
  useEffect(() => {
    const controller = new AbortController();

    const fetchFoods = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          "https://restaurant-management-server-three.vercel.app/sixcard",
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch food items");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid food data received");
        }

        setService(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Food fetching error:", err);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchFoods();

    return () => controller.abort();
  }, [retry]);

  // Loading Skeleton
  const SkeletonCard = () => (
    <div className="overflow-hidden rounded-[28px] border border-[#D4A853]/20 bg-white p-4 shadow-sm">
      <div className="h-60 animate-pulse rounded-2xl bg-[#E5E9E1] sm:h-64" />

      <div className="px-2 pb-2 pt-5">
        <div className="h-6 w-3/4 animate-pulse rounded-lg bg-[#E5E9E1]" />

        <div className="mt-4 h-3 w-1/2 animate-pulse rounded bg-[#E5E9E1]" />

        <div className="mt-5 h-4 w-full animate-pulse rounded bg-[#E5E9E1]" />

        <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-[#E5E9E1]" />

        <div className="mt-7 h-12 w-full animate-pulse rounded-2xl bg-[#E5E9E1]" />
      </div>
    </div>
  );

  return (
    <section className="overflow-hidden bg-[#F5F1E8] py-16 sm:py-20 lg:py-24">
      {/* Featured Food Collection */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-[2px] w-10 bg-[#B58A42]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#174C3A] sm:text-xs">
              Discover Our Collection
            </span>

            <span className="h-[2px] w-10 bg-[#B58A42]" />
          </div>

          {/* Main Heading */}
          <h2 className="font-serif text-3xl font-bold leading-tight text-[#24382E] sm:text-4xl md:text-5xl lg:text-6xl">
            Choose Your
            <span className="mt-2 block text-[#174C3A]">
              Mouth-Watering Delights
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-sm font-medium leading-7 text-[#68766C] sm:text-base sm:leading-8">
            Explore an exceptional collection of delicious dishes, thoughtfully
            prepared with fresh ingredients, authentic flavours and a passion
            for unforgettable dining.
          </p>

          {/* Decorative Divider */}
          <div className="mx-auto mt-7 flex items-center justify-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#B58A42]" />
            <span className="h-[2px] w-16 bg-[#B58A42]" />
            <span className="h-2 w-2 rotate-45 bg-[#174C3A]" />
            <span className="h-[2px] w-16 bg-[#B58A42]" />
            <span className="h-1 w-1 rounded-full bg-[#B58A42]" />
          </div>
        </div>

        {/* Collection Header */}
        <div className="mb-8 flex flex-col gap-4 border-b border-[#174C3A]/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#B58A42] sm:text-xs">
              Our Special Selection
            </p>

            <h3 className="mt-2 font-serif text-2xl font-bold text-[#24382E] sm:text-3xl">
              Featured Food Items
            </h3>

            <p className="mt-2 text-sm text-[#68766C]">
              Handpicked favourites for an unforgettable dining experience.
            </p>
          </div>

          {/* Food Counter */}
          <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-[#D4A853]/30 bg-white px-5 py-3 shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#174C3A]/10 text-[#174C3A]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h18v18H3zM3 9h18M9 21V9"
                />
              </svg>
            </span>

            <div>
              <p className="text-lg font-extrabold leading-none text-[#174C3A]">
                {loading ? "..." : service.length}
              </p>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#8A958C]">
                Featured Items
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="mx-auto max-w-xl rounded-[28px] border border-red-200 bg-white px-6 py-12 text-center shadow-[0_12px_35px_rgba(36,56,46,0.06)] sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.3 3.8 1.8 18.5a1.5 1.5 0 0 0 1.3 2.2h17.8a1.5 1.5 0 0 0 1.3-2.2L13.7 3.8a1.9 1.9 0 0 0-3.4 0Z"
                />
              </svg>
            </div>

            <h3 className="mt-6 font-serif text-2xl font-bold text-[#24382E]">
              Unable to Load Food Items
            </h3>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#68766C]">
              We are having trouble connecting to our restaurant server. Please
              try again in a moment.
            </p>

            <button
              type="button"
              onClick={() => setRetry((prev) => prev + 1)}
              className="group mt-7 inline-flex items-center justify-center gap-3 rounded-full bg-[#174C3A] px-9 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#174C3A]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#216448] hover:shadow-xl active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#D4A853] focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h5M20 20v-5h-5M5.6 9A7 7 0 0 1 18 6l2 3M18.4 15A7 7 0 0 1 6 18l-2-3"
                />
              </svg>
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && service.length === 0 && (
          <div className="rounded-[28px] border border-[#D4A853]/25 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5F1E8] text-3xl">
              🍽️
            </div>

            <h3 className="mt-5 font-serif text-2xl font-bold text-[#24382E]">
              No Food Items Available
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#68766C]">
              Our delicious collection is being updated. Please visit us again
              soon to explore our latest selections.
            </p>
          </div>
        )}

        {/* Food Cards */}
        {!loading && !error && service.length > 0 && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {service.map((item) => (
              <FoodCard key={item._id} service={item} />
            ))}
          </div>
        )}

        {/* Explore All Foods Button */}
        {!loading && !error && (
          <div className="mt-14 flex justify-center">
            <Link
              to="/AllFood"
              className="group inline-flex items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#174C3A] to-[#216448] px-9 py-4 text-xs font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_8px_25px_rgba(23,76,58,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(23,76,58,0.3)] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#D4A853] focus:ring-offset-2 sm:px-12 sm:py-5"
            >
              <span>Explore All Foods</span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#D4A853] group-hover:text-[#24382E]">
                →
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Premium Restaurant Video Section */}
      <div className="mx-auto mt-24 max-w-7xl px-5 sm:px-8">
        <div className="group relative overflow-hidden rounded-[28px] bg-[#174C3A] shadow-[0_20px_60px_rgba(23,76,58,0.15)] sm:rounded-[36px]">
          {/* Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Abrar's Dine restaurant experience"
            className="h-[360px] w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03] sm:h-[440px] lg:h-[540px]"
          >
            <source src="/Intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#123A2D]/95 via-[#174C3A]/70 to-[#174C3A]/15" />

          {/* Gold Decorative Border */}
          <div className="pointer-events-none absolute inset-4 rounded-[22px] border border-white/15 sm:inset-6 sm:rounded-[28px]" />

          {/* Video Content */}
          <div className="absolute inset-0 flex items-center px-8 sm:px-14 lg:px-20">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-10 bg-[#D4A853]" />

                <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#F1D69A] sm:text-xs">
                  The Abrar's Dine Experience
                </span>
              </div>

              <h2 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Where Every Meal
                <span className="mt-2 block italic text-[#F1D69A]">
                  Becomes a Memory
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
                Discover exceptional flavours, warm hospitality and
                unforgettable moments. Welcome to the world of Abrar's Dine.
              </p>

              <Link
                to="/AllFood"
                className="group/button mt-8 inline-flex items-center gap-4 rounded-full bg-[#F5F1E8] px-8 py-4 text-xs font-extrabold uppercase tracking-[0.13em] text-[#174C3A] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#D4A853] hover:text-[#24382E] hover:shadow-2xl active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#174C3A]"
              >
                Discover Our Menu
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#174C3A]/10 text-lg transition-all duration-300 group-hover/button:translate-x-1 group-hover/button:bg-[#174C3A] group-hover/button:text-white">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
