import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = "https://abrars-dine-server.onrender.com";

const Foods = ({ foods }) => {
  const navigate = useNavigate();

  const [fetchedFoods, setFetchedFoods] = useState([]);
  const [loading, setLoading] = useState(!Array.isArray(foods));
  const [error, setError] = useState("");

  // Support both AllFood.jsx props and standalone usage
  const isControlled = Array.isArray(foods);
  const data = isControlled ? foods : fetchedFoods;

  // Fetch Foods when no props are provided
  useEffect(() => {
    if (isControlled) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchFoods = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/dish`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load our food collection.");
        }

        const result = await response.json();

        if (!Array.isArray(result)) {
          throw new Error("Invalid food data received.");
        }

        setFetchedFoods(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchFoods();

    return () => controller.abort();
  }, [isControlled]);

  // Navigate to Food Purchase Page
  const myOrderHandle = (food) => {
    const foodId = food?._id;

    if (!foodId) {
      Swal.fire({
        title: "Unable to Continue",
        text: "Food information is missing. Please try again.",
        icon: "error",
        confirmButtonColor: "#174C3A",
        background: "#F5F1E8",
        color: "#24382E",
      });

      return;
    }

    navigate(`/foodPurchase/${foodId}`);
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-[350px] items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-[#174C3A]" />

          <p className="mt-4 font-serif text-sm tracking-wider text-[#174C3A]">
            Preparing Our Delicious Collection...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="rounded-3xl border border-[#B58A42]/20 bg-white px-5 py-14 text-center shadow-sm">
        <div className="mb-4 text-4xl">🍽️</div>

        <h3 className="font-serif text-2xl font-bold text-[#24382E]">
          Something Went Wrong
        </h3>

        <p className="mt-3 text-sm text-[#829087]">{error}</p>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-full bg-[#174C3A] px-7 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#216448]"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty State
  if (!data || data.length === 0) {
    return (
      <div className="rounded-3xl border border-[#B58A42]/20 bg-white px-5 py-16 text-center shadow-sm">
        <div className="mb-5 text-5xl">🥗</div>

        <h3 className="font-serif text-2xl font-bold text-[#24382E]">
          No Dishes Available
        </h3>

        <p className="mt-3 text-sm text-[#829087]">
          Our delicious collection will be available soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 xl:grid-cols-3 xl:gap-8">
      {data.map((food, index) => {
        const foodId = food._id || food.id || food.name;

        return (
          <article
            key={foodId || index}
            className="group relative flex h-full flex-col overflow-hidden rounded-[25px] border border-[#B58A42]/20 bg-white shadow-[0_10px_35px_rgba(36,56,46,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-[#B58A42]/50 hover:shadow-[0_22px_55px_rgba(36,56,46,0.13)]"
          >
            {/* FOOD IMAGE */}
            <div className="relative h-[235px] overflow-hidden bg-[#EEE9DD] sm:h-[250px]">
              <img
                src={food.image}
                alt={food.name || "Delicious food"}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#142D22]/65 via-transparent to-black/10 opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

              {/* Category Badge */}
              <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                <span className="rounded-full border border-white/30 bg-white/90 px-3.5 py-2 text-[9px] font-extrabold uppercase tracking-[0.13em] text-[#174C3A] shadow-md backdrop-blur-md">
                  {food.category || "Chef's Special"}
                </span>
              </div>

              {/* Premium Label */}
              <div className="absolute bottom-4 left-5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8C77D]" />

                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white">
                  Crafted With Passion
                </span>
              </div>

              {/* Price Badge */}
              <div className="absolute bottom-4 right-4 rounded-full border border-[#E8C77D]/50 bg-[#174C3A]/95 px-4 py-2 shadow-lg backdrop-blur-md">
                <span className="font-serif text-lg font-bold text-[#E8C77D]">
                  ${food.price ?? "N/A"}
                </span>
              </div>
            </div>

            {/* FOOD INFORMATION */}
            <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
              {/* Food Name */}
              <div className="min-h-[55px]">
                <h2 className="font-serif text-xl font-bold leading-snug tracking-tight text-[#24382E] transition-colors duration-300 group-hover:text-[#174C3A] sm:text-2xl">
                  {food.name}
                </h2>
              </div>

              {/* Gold Separator */}
              <div className="my-4 flex items-center gap-2">
                <span className="h-[2px] w-8 bg-[#B58A42]" />
                <span className="h-1.5 w-1.5 rotate-45 bg-[#B58A42]" />
                <span className="h-px w-7 bg-[#B58A42]/40" />
              </div>

              {/* Chef Information */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#B58A42]/30 bg-[#F5F1E8] text-[#947039]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M6 10a6 6 0 0 1 12 0v2H6v-2Z" />
                    <path d="M4 12h16l-2 8H6l-2-8Z" />
                    <path d="M9 4V2M15 4V2" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <p className="text-[8px] font-bold uppercase tracking-[0.17em] text-[#A18A60]">
                    Prepared By
                  </p>

                  <p className="truncate text-xs font-semibold text-[#174C3A]">
                    {food.chef || "Abrar's Dine Kitchen"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 min-h-[66px] text-[12px] leading-[1.8] text-[#77847A] sm:text-[13px]">
                {food.description
                  ? food.description.length > 115
                    ? `${food.description.slice(0, 115)}...`
                    : food.description
                  : "Thoughtfully prepared with authentic flavors and exceptional care."}
              </p>

              {/* Additional Details */}
              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#B58A42]/20 pt-4">
                <div className="flex items-center gap-1.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-3.5 w-3.5 text-[#B58A42]"
                    aria-hidden="true"
                  >
                    <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>

                  <span className="text-[10px] text-[#68766C]">
                    {food.origin || "Freshly Prepared"}
                  </span>
                </div>

                <span className="h-1 w-1 rounded-full bg-[#B58A42]" />

                <div className="flex items-center gap-1.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-3.5 w-3.5 text-[#B58A42]"
                    aria-hidden="true"
                  >
                    <path d="M4 7h16v13H4z" />
                    <path d="M8 7V4h8v3M8 12h8M8 16h5" />
                  </svg>

                  <span className="text-[10px] text-[#68766C]">
                    Qty: {food.quantity ?? "N/A"}
                  </span>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <button
                type="button"
                onClick={() => myOrderHandle(food)}
                className="group/btn mt-6 flex w-full items-center justify-between rounded-full bg-gradient-to-r from-[#174C3A] to-[#216448] px-5 py-3.5 text-[9px] font-extrabold uppercase tracking-[0.17em] text-white shadow-[0_8px_20px_rgba(23,76,58,0.15)] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(23,76,58,0.25)] sm:px-6"
              >
                <span>Order This Delight</span>

                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:bg-white group-hover/btn:text-[#174C3A]">
                  →
                </span>
              </button>
            </div>

            {/* Bottom Gold Accent */}
            <div className="h-[3px] w-0 bg-gradient-to-r from-[#B58A42] to-[#E8C77D] transition-all duration-500 group-hover:w-full" />
          </article>
        );
      })}
    </div>
  );
};

export default Foods;
