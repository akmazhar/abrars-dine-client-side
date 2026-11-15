import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import Foods from "./Foods";

const AllFood = () => {
  const apiItem = useLoaderData() || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  // Search Food Items
  const filteredFoods = useMemo(() => {
    const query = activeSearch.trim().toLowerCase();

    if (!query) return apiItem;

    return apiItem.filter((food) => food.name?.toLowerCase().includes(query));
  }, [apiItem, activeSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setActiveSearch("");
  };

  return (
    <>
      <Helmet>
        <title>Abrar's Dine | Explore Our Menu</title>
        <meta
          name="description"
          content="Explore the delicious collection of authentic Bengali, Italian, Chinese and international cuisine at Abrar's Dine."
        />
      </Helmet>

      <main className="min-h-screen bg-[#F5F1E8]">
        {/* =================================
            PREMIUM FOOD HERO SECTION
        ================================= */}

        <section className="relative flex min-h-[430px] items-center justify-center overflow-hidden bg-[#142D22] sm:min-h-[500px] lg:min-h-[560px]">
          {/* Background Image */}
          <img
            src="https://i.ibb.co/KWCTq6Y/Food-Menu.png"
            alt="Abrar's Dine food collection"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
          />

          {/* Premium Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#10251B]/95 via-[#142D22]/85 to-[#142D22]/65" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#10251B]/65 via-transparent to-black/10" />

          {/* Decorative Gold Elements */}
          <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#E8C77D] via-[#B58A42] to-transparent" />

          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#E8C77D]/15" />

          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-[#E8C77D]/10" />

          {/* Hero Content */}
          <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-20 text-center sm:px-8">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#E8C77D]/35 bg-white/5 px-5 py-2.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8C77D]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#E8C77D] sm:text-[10px]">
                A World of Extraordinary Flavors
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Discover Our
              <span className="mt-2 block font-serif italic font-medium text-[#E8C77D]">
                Delicious Menu
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-xl text-xs leading-7 text-white/75 sm:mt-6 sm:text-sm sm:leading-8">
              From authentic Bengali heritage to international culinary
              favorites, discover thoughtfully prepared dishes made to delight
              every taste.
            </p>

            {/* Decorative Separator */}
            <div className="my-7 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#B58A42]" />
              <span className="h-1.5 w-1.5 rotate-45 bg-[#E8C77D]" />
              <span className="h-px w-10 bg-[#B58A42]" />
            </div>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="mx-auto flex w-full max-w-[620px] items-center rounded-full border border-white/20 bg-white p-1.5 shadow-[0_15px_50px_rgba(0,0,0,0.25)] transition-all duration-300 focus-within:border-[#B58A42]"
            >
              {/* Search Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[#174C3A] sm:h-12 sm:w-12">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16 16 4 4" />
                </svg>
              </div>

              {/* Search Input */}
              <input
                type="search"
                name="foodSearch"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setActiveSearch(e.target.value);
                }}
                placeholder="Search your favorite dish..."
                aria-label="Search food by name"
                className="min-w-0 flex-1 border-none bg-transparent text-xs text-[#24382E] outline-none placeholder:text-[#9CA69D] focus:outline-none sm:text-sm"
              />

              {/* Clear Button */}
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#68766C] transition hover:bg-[#F5F1E8]"
                >
                  ✕
                </button>
              )}

              {/* Search Button */}
              <button
                type="submit"
                className="shrink-0 rounded-full bg-gradient-to-r from-[#174C3A] to-[#216448] px-5 py-3 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white shadow-md transition-all duration-300 hover:from-[#216448] hover:to-[#174C3A] sm:px-8 sm:py-3.5 sm:text-[10px]"
              >
                Search
              </button>
            </form>

            {/* Search Hint */}
            <p className="mt-4 text-[9px] font-medium tracking-wider text-white/55 sm:text-[10px]">
              FIND YOUR FAVORITE FLAVOR AT ABRAR'S DINE
            </p>
          </div>

          {/* Bottom Gold Border */}
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-transparent via-[#B58A42] to-transparent" />
        </section>

        {/* =================================
            MENU CONTENT SECTION
        ================================= */}

        <section className="relative mx-auto max-w-[1440px] px-4 py-14 sm:px-7 sm:py-16 lg:px-12 lg:py-20">
          {/* Section Heading */}
          <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-[2px] w-7 bg-[#B58A42]" />

                <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#947039]">
                  Curated For You
                </span>
              </div>

              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#24382E] sm:text-4xl lg:text-5xl">
                Explore Our
                <span className="ml-2 italic font-medium text-[#174C3A]">
                  Collection
                </span>
              </h2>

              <p className="mt-3 max-w-lg text-xs leading-7 text-[#7B877E] sm:text-sm">
                Discover exceptional flavors, carefully selected and prepared
                with passion.
              </p>
            </div>

            {/* Result Counter */}
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[#B58A42]/30 bg-white px-5 py-3 shadow-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#174C3A] font-serif text-sm font-bold text-white">
                {filteredFoods.length}
              </span>

              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#174C3A]">
                  Available Dishes
                </p>

                <p className="text-[9px] text-[#9AA198]">
                  {activeSearch ? "Search Results" : "Our Food Collection"}
                </p>
              </div>
            </div>
          </div>

          {/* Search Result Information */}
          {activeSearch && (
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#B58A42]/20 bg-white/70 px-4 py-3">
              <p className="text-xs text-[#68766C]">
                Results for:
                <span className="ml-1 font-bold text-[#174C3A]">
                  "{activeSearch}"
                </span>
              </p>

              <button
                onClick={clearSearch}
                className="text-[10px] font-bold uppercase tracking-wider text-[#947039] transition hover:text-[#174C3A]"
              >
                Clear Search ✕
              </button>
            </div>
          )}

          {/* Food Grid */}
          {filteredFoods.length > 0 ? (
            <Foods foods={filteredFoods} />
          ) : (
            /* Empty Search State */
            <div className="rounded-3xl border border-[#B58A42]/20 bg-white px-5 py-16 text-center shadow-sm sm:py-20">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F1E8] text-4xl">
                🍽️
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#24382E] sm:text-3xl">
                No Dishes Found
              </h3>

              <p className="mx-auto mt-4 max-w-sm text-xs leading-7 text-[#829087] sm:text-sm">
                We couldn't find a dish matching your search. Try another food
                name and discover something delicious.
              </p>

              <button
                onClick={clearSearch}
                className="mt-7 rounded-full bg-[#174C3A] px-7 py-3.5 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-[#216448]"
              >
                Explore All Dishes
              </button>
            </div>
          )}
        </section>

        {/* =================================
            BRAND FOOTER MESSAGE
        ================================= */}

        <section className="border-t border-[#B58A42]/20 bg-[#EEE9DD] px-5 py-12 text-center sm:py-16">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#947039]">
            The Art of Good Food
          </p>

          <h2 className="mt-4 font-serif text-2xl font-semibold italic text-[#174C3A] sm:text-3xl">
            Good Food. Beautiful Moments.
          </h2>

          <p className="mt-3 text-[10px] tracking-wider text-[#829087] sm:text-xs">
            ABRAR'S DINE — TASTE, QUALITY & TRADITION
          </p>
        </section>
      </main>
    </>
  );
};

export default AllFood;
