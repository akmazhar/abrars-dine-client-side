import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co.com/2Yh5NXZd/Rustic-Rainbow-Vegetable-Bowl.png",
    eyebrow: "FRESH • HEALTHY • NATURAL",
    title: "Healthy Farm-Fresh",
    highlight: "Veg. Delights",
    description:
      "Experience the freshness of nature at Abrar's Dine. Enjoy handpicked seasonal vegetables, thoughtfully prepared with authentic flavors and a passion for healthy dining.",
    category: "Fresh & Healthy",
    number: "01",
  },
  {
    id: 2,
    image:
      "https://i.ibb.co.com/LXM9wHFG/Discover-Global-Culinary-Delights.png",
    eyebrow: "A WORLD OF FLAVORS",
    title: "Discover Global",
    highlight: "Culinary Delights",
    description:
      "Travel across cultures through authentic Bangladeshi, Chinese, Japanese, Italian, Thai and Mexican cuisine. Exceptional flavors, memorable moments and affordable luxury.",
    category: "International Cuisine",
    number: "02",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/rGK7w9XH/Rustic-Gourmet-Lasagna-Feast.png",
    eyebrow: "AUTHENTIC ITALIAN EXPERIENCE",
    title: "The Art of",
    highlight: "Perfect Lasagna",
    description:
      "Layers of rich Bolognese sauce, creamy béchamel and melted cheese come together in a timeless Italian masterpiece. Every bite is pure comfort.",
    category: "Italian Special",
    number: "03",
  },
  {
    id: 4,
    image: "https://i.ibb.co.com/v6Zmqxk9/Traditional-Panta-Ilish-Feast.png",
    eyebrow: "A TASTE OF BANGLADESH",
    title: "Celebrate Our",
    highlight: "Bengali Heritage",
    description:
      "Discover the authentic taste of Panta Ilish, a timeless Bengali culinary tradition. A beautiful harmony of heritage, culture and unforgettable flavors.",
    category: "Traditional Bengali",
    number: "04",
  },
];

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6500);
    return () => clearInterval(timer);
  }, []);

  const activeItem = slides[activeSlide];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#F5F1E8]"
      aria-label="Abrar's Dine featured dishes"
    >
      <div className="relative h-[650px] min-h-[570px] sm:h-[680px] lg:h-[710px] xl:h-[730px]">
        {/* Background Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === index
                ? "z-10 opacity-100"
                : "pointer-events-none z-0 opacity-0"
            }`}
            aria-hidden={activeSlide !== index}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.category}
              loading={index === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                activeSlide === index ? "scale-105" : "scale-100"
              }`}
            />

            {/* Premium Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5F1E8] via-[#F5F1E8]/95 via-[52%] to-[#F5F1E8]/20 sm:via-[48%]" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#24382E]/15 via-transparent to-[#F5F1E8]/10" />

            {/* Gold Accent */}
            <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#E8C77D] via-[#174C3A] to-[#B58A42]" />

            {/* Main Content */}
            <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] items-center px-5 py-14 sm:px-10 lg:px-16 xl:px-20">
              <div className="w-full max-w-[590px]">
                {/* Eyebrow */}
                <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#B58A42]/30 bg-white/65 px-3.5 py-2 shadow-sm backdrop-blur-md sm:mb-6 sm:px-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B58A42] shadow-[0_0_8px_rgba(181,138,66,0.6)]" />

                  <span className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#174C3A] sm:text-[10px] sm:tracking-[0.25em]">
                    {slide.eyebrow}
                  </span>
                </div>

                {/* Compact Editorial Heading */}
                <h1 className="font-serif text-[clamp(2rem,5.1vw,4.25rem)] font-medium leading-[1.12] tracking-[-0.045em] text-[#24382E]">
                  <span className="block">{slide.title}</span>

                  <span className="mt-1 block font-semibold italic leading-[1.15] text-[#174C3A]">
                    {slide.highlight}
                  </span>
                </h1>

                {/* Decorative Separator */}
                <div className="mt-5 flex items-center gap-2.5 sm:mt-6">
                  <span className="h-[2px] w-10 bg-[#B58A42]" />
                  <span className="h-1.5 w-1.5 rotate-45 bg-[#B58A42]" />
                  <span className="h-px w-7 bg-[#B58A42]/50" />
                </div>

                {/* Brand Identity */}
                <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-3">
                  <span className="font-serif text-xl font-bold tracking-tight text-[#174C3A] sm:text-2xl">
                    Abrar's Dine
                  </span>

                  <span className="rounded-full border border-[#B58A42]/40 px-2.5 py-1 text-[7px] font-bold uppercase tracking-[0.16em] text-[#947039] sm:text-[8px] sm:tracking-[0.2em]">
                    Taste & Tradition
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 max-w-[470px] text-[12px] font-normal leading-[1.8] tracking-[0.01em] text-[#59665D] sm:mt-5 sm:text-[14px] sm:leading-[1.9]">
                  {slide.description}
                </p>

                {/* Action Buttons */}
                <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-8 sm:gap-5">
                  <Link
                    to="/AllFood"
                    className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#174C3A] to-[#216448] px-5 py-3 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_10px_25px_rgba(23,76,58,0.20)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(23,76,58,0.30)] sm:gap-4 sm:px-7 sm:py-3.5 sm:text-[10px]"
                  >
                    Explore Our Menu
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#174C3A]">
                      →
                    </span>
                  </Link>

                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B58A42]/40 text-[#B58A42]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      >
                        <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3z" />
                      </svg>
                    </span>

                    <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#68766C] sm:text-[9px] sm:tracking-[0.15em]">
                      Crafted With Passion
                    </span>
                  </div>
                </div>

                {/* Slide Counter */}
                <div className="mt-8 flex items-center gap-3 sm:mt-10 sm:gap-4">
                  <span className="font-serif text-2xl font-semibold text-[#174C3A] sm:text-3xl">
                    {activeItem.number}
                  </span>

                  <span className="h-px w-9 bg-[#B58A42] sm:w-12" />

                  <span className="text-[9px] font-bold tracking-[0.18em] text-[#8A9188]">
                    0{slides.length}
                  </span>

                  <span className="ml-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#A0A69E] sm:text-[9px]">
                    Featured Collection
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-5 z-20 flex items-center gap-2 sm:bottom-10 sm:left-10 lg:left-20">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                activeSlide === index
                  ? "w-9 bg-[#174C3A] sm:w-11"
                  : "w-3.5 bg-[#174C3A]/25 hover:bg-[#174C3A]/60"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="absolute bottom-6 right-5 z-20 flex items-center gap-2 sm:bottom-8 sm:right-10 sm:gap-3 lg:right-20">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#174C3A]/20 bg-white/80 text-base text-[#174C3A] shadow-md backdrop-blur-md transition-all duration-300 hover:bg-[#174C3A] hover:text-white sm:h-12 sm:w-12"
          >
            ←
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#174C3A]/20 bg-white/80 text-base text-[#174C3A] shadow-md backdrop-blur-md transition-all duration-300 hover:bg-[#174C3A] hover:text-white sm:h-12 sm:w-12"
          >
            →
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 z-20 h-[3px] w-full bg-[#174C3A]/10">
          <div
            className="h-full bg-gradient-to-r from-[#B58A42] to-[#E8C77D] transition-all duration-700"
            style={{
              width: `${((activeSlide + 1) / slides.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
