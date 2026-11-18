import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const API_URL = "https://abrars-dine-server.onrender.com";

const MyAddedFood = () => {
  const [dataApi, setDataApi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchAddedFood = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/myAddedFood`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load your food collection.");
        }

        const result = await response.json();

        if (!Array.isArray(result)) {
          throw new Error("Invalid food data received from server.");
        }

        setDataApi(result);
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

    fetchAddedFood();

    return () => controller.abort();
  }, []);

  return (
    <>
      <Helmet>
        <title>Abrar's Dine | My Added Food</title>
        <meta
          name="description"
          content="Explore and manage your added food collection at Abrar's Dine."
        />
      </Helmet>

      <main className="min-h-screen bg-[#F5F1E8] pb-16">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-[#10392C]">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://i.ibb.co/r6KQ26k/pol.png"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#10392C]/95 via-[#10392C]/80 to-[#10392C]/50" />

          <div className="relative mx-auto flex min-h-[280px] max-w-7xl items-center px-5 py-16 sm:px-8 md:min-h-[340px] lg:px-12">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D8B56D]/40 bg-white/10 px-4 py-2 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#E8C77D]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E8C77D]">
                  Abrar's Dine Collection
                </span>
              </div>

              <h1 className="font-serif text-4xl font-bold leading-tight text-[#F5F1E8] sm:text-5xl md:text-6xl">
                My Added
                <span className="block italic text-[#D8B56D]">
                  Food Collection
                </span>
              </h1>

              <div className="my-5 flex items-center gap-2">
                <span className="h-[2px] w-12 bg-[#B58A42]" />
                <span className="h-2 w-2 rotate-45 bg-[#B58A42]" />
              </div>

              <p className="max-w-lg text-sm leading-7 text-white/75 sm:text-base">
                A personal collection of culinary creations, carefully selected
                and added to your dining experience.
              </p>

              {!loading && !error && (
                <div className="mt-7 inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-md">
                  <span className="font-serif text-2xl font-bold text-[#E8C77D]">
                    {dataApi.length}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                    Added Foods
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FOOD COLLECTION */}
        <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-8 md:pt-16 lg:px-12">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#A17B3D]">
                Your Culinary Selection
              </p>

              <h2 className="font-serif text-3xl font-bold text-[#24382E] sm:text-4xl">
                All Added Foods
              </h2>

              <p className="mt-2 text-sm text-[#829087]">
                Manage and explore your selected dishes.
              </p>
            </div>

            <div className="h-px flex-1 bg-gradient-to-r from-[#B58A42]/50 to-transparent sm:mb-3 sm:ml-8" />
          </div>

          {/* LOADING */}
          {loading && (
            <div className="flex min-h-[300px] flex-col items-center justify-center">
              <span className="loading loading-spinner loading-lg text-[#174C3A]" />
              <p className="mt-5 font-serif text-sm tracking-wider text-[#174C3A]">
                Preparing Your Food Collection...
              </p>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="rounded-3xl border border-red-200 bg-white px-5 py-14 text-center shadow-sm">
              <div className="mb-4 text-5xl">⚠️</div>

              <h3 className="font-serif text-2xl font-bold text-[#24382E]">
                Something Went Wrong
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm text-[#829087]">
                {error}
              </p>

              <button
                onClick={() => window.location.reload()}
                className="mt-6 rounded-full bg-[#174C3A] px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#216448]"
              >
                Try Again
              </button>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && dataApi.length === 0 && (
            <div className="rounded-3xl border border-[#B58A42]/20 bg-white px-5 py-16 text-center shadow-sm">
              <div className="mb-5 text-6xl">🍽️</div>

              <h3 className="font-serif text-2xl font-bold text-[#24382E] sm:text-3xl">
                Your Collection Is Empty
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#829087]">
                You haven't added any food items yet. Start exploring our
                delicious collection.
              </p>

              <Link
                to="/allFood"
                className="mt-7 inline-flex items-center justify-center rounded-full bg-[#174C3A] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#216448]"
              >
                Explore Our Menu →
              </Link>
            </div>
          )}

          {/* FOOD CARDS */}
          {!loading && !error && dataApi.length > 0 && (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
              {dataApi.map((item) => {
                const foodName = item.name || item.food_name || "Untitled Food";
                const foodImage = item.image || item.food_image;
                const foodCategory =
                  item.category || item.food_category || "Chef's Special";

                return (
                  <article
                    key={item._id}
                    className="group flex h-full flex-col overflow-hidden rounded-[25px] border border-[#B58A42]/20 bg-white shadow-[0_10px_35px_rgba(36,56,46,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-[#B58A42]/50 hover:shadow-[0_22px_50px_rgba(36,56,46,0.13)]"
                  >
                    {/* IMAGE */}
                    <div className="relative h-[230px] overflow-hidden bg-[#EEE9DD] sm:h-[245px]">
                      {foodImage ? (
                        <img
                          src={foodImage}
                          alt={foodName}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-6xl">
                          🍽️
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#10392C]/65 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute left-4 top-4">
                        <span className="rounded-full border border-white/30 bg-white/90 px-4 py-2 text-[9px] font-extrabold uppercase tracking-widest text-[#174C3A] shadow-md backdrop-blur-md">
                          {foodCategory}
                        </span>
                      </div>

                      <div className="absolute bottom-4 right-4 rounded-full border border-[#E8C77D]/50 bg-[#174C3A]/95 px-5 py-2 shadow-lg">
                        <span className="font-serif text-lg font-bold text-[#E8C77D]">
                          $ {item.price ?? "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex-1">
                        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#A18A60]">
                          Your Selected Dish
                        </p>

                        <h3 className="font-serif text-2xl font-bold leading-snug text-[#24382E] transition-colors group-hover:text-[#174C3A]">
                          {foodName}
                        </h3>

                        <div className="my-4 flex items-center gap-2">
                          <span className="h-[2px] w-8 bg-[#B58A42]" />
                          <span className="h-1.5 w-1.5 rotate-45 bg-[#B58A42]" />
                          <span className="h-px w-7 bg-[#B58A42]/40" />
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs font-semibold text-[#829087]">
                              Category
                            </span>
                            <span className="text-right text-xs font-bold text-[#174C3A]">
                              {foodCategory}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs font-semibold text-[#829087]">
                              Origin
                            </span>
                            <span className="text-right text-xs font-bold text-[#174C3A]">
                              {item.origin || "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs font-semibold text-[#829087]">
                              Available Quantity
                            </span>
                            <span className="text-right text-xs font-bold text-[#174C3A]">
                              {item.quantity ?? "N/A"}
                            </span>
                          </div>
                        </div>

                        <div className="mt-5 rounded-xl bg-[#F5F1E8] p-4">
                          <p className="mb-2 text-[9px] font-extrabold uppercase tracking-widest text-[#A18A60]">
                            Description
                          </p>

                          <p className="text-xs leading-6 text-[#68766C]">
                            {item.description ||
                              "Thoughtfully prepared with authentic flavors and exceptional care."}
                          </p>
                        </div>
                      </div>

                      {/* UPDATE BUTTON */}
                      <Link
                        to={`/UpdateFood/${item._id}`}
                        className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#174C3A] to-[#216448] px-5 py-3.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_8px_20px_rgba(23,76,58,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(23,76,58,0.25)]"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
                        </svg>
                        Update Food Details
                      </Link>
                    </div>

                    <div className="h-[3px] w-0 bg-gradient-to-r from-[#B58A42] to-[#E8C77D] transition-all duration-500 group-hover:w-full" />
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default MyAddedFood;
