import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co/Nnf0Qcn/1.png",
    eyebrow: "FRESH • HEALTHY • NATURAL",
    title: "Healthy & Farm-Fresh",
    highlight: "Vegetable Delights",
    description:
      "Experience the freshness of nature at Abrar's Dine. Enjoy handpicked seasonal vegetables, thoughtfully prepared with authentic flavors and a passion for healthy dining.",
    category: "Fresh & Healthy",
  },
  {
    id: 2,
    image: "https://i.ibb.co/T1zNGVG/2.png",
    eyebrow: "A WORLD OF FLAVORS",
    title: "Discover Global",
    highlight: "Culinary Delights",
    description:
      "Travel across cultures through authentic Bangladeshi, Chinese, Japanese, Italian, Thai and Mexican cuisine. Exceptional flavors, memorable moments and affordable luxury.",
    category: "International Cuisine",
  },
  {
    id: 3,
    image: "https://i.ibb.co/yWVhrrp/5.png",
    eyebrow: "AUTHENTIC ITALIAN EXPERIENCE",
    title: "The Art of",
    highlight: "Perfect Lasagna",
    description:
      "Layers of rich Bolognese sauce, creamy béchamel and melted cheese come together in a timeless Italian masterpiece. Every bite is pure comfort.",
    category: "Italian Special",
  },
  {
    id: 4,
    image: "https://i.ibb.co/KxZVqQH/3.png",
    eyebrow: "A TASTE OF BANGLADESH",
    title: "Celebrate Our",
    highlight: "Bengali Heritage",
    description:
      "Discover the authentic taste of Panta Ilish, a timeless Bengali culinary tradition. A beautiful harmony of heritage, culture and unforgettable flavors.",
    category: "Traditional Bengali",
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
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#F5F1E8]"
      aria-label="Abrar's Dine featured dishes"
    >
      <div className="relative h-[600px] min-h-[540px] md:h-[660px] lg:h-[700px]">
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
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading={index === 0 ? "eager" : "lazy"}
            />

            {/* Modern Light Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5F1E8] via-[#F5F1E8]/95 via-45% to-[#F5F1E8]/15" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#F5F1E8]/35 via-transparent to-[#F5F1E8]/20" />

            {/* Decorative Accent */}
            <div className="absolute left-0 top-0 h-full w-1.5 bg-[#174C3A]" />

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 py-16 sm:px-10 lg:px-16">
              <div className="max-w-3xl">
                {/* Eyebrow */}
                <div className="mb-7 flex items-center gap-3">
                  <span className="h-[2px] w-10 bg-[#B58A42]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#174C3A] sm:text-xs">
                    {slide.eyebrow}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="font-serif text-4xl font-bold leading-[1.15] tracking-tight text-[#24382E] sm:text-5xl md:text-6xl lg:text-7xl">
                  {slide.title}

                  <span className="mt-2 block font-serif italic font-semibold text-[#174C3A]">
                    {slide.highlight}
                  </span>
                </h1>

                {/* Brand Name */}
                <div className="mt-6">
                  <p className="font-serif text-xl font-semibold tracking-wide text-[#43574A] sm:text-2xl">
                    <span className="text-[#B58A42]">@</span> Abrar's Dine
                  </p>

                  <div className="mt-3 h-[2px] w-20 bg-[#B58A42]" />
                </div>

                {/* Description */}
                <p className="mt-7 max-w-xl text-sm font-medium leading-7 text-[#59665D] sm:text-base sm:leading-8">
                  {slide.description}
                </p>

                {/* Premium Buttons */}
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    to="/AllFood"
                    className="group inline-flex items-center gap-4 rounded-full bg-[#174C3A] px-8 py-4 text-xs font-bold uppercase tracking-[0.13em] text-white shadow-[0_8px_25px_rgba(23,76,58,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#216448] hover:shadow-[0_12px_30px_rgba(23,76,58,0.3)] sm:px-10"
                  >
                    Explore Our Menu
                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>

                  <span className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#526257] sm:text-sm">
                    <span className="h-2 w-2 rounded-full bg-[#B58A42]" />
                    Crafted With Passion
                  </span>
                </div>

                {/* Slide Number */}
                <div className="mt-12 flex items-center gap-3 text-xs font-semibold tracking-widest text-[#8A9188]">
                  <span className="font-serif text-2xl text-[#174C3A]">
                    0{activeSlide + 1}
                  </span>

                  <span className="h-[1px] w-12 bg-[#B58A42]" />

                  <span>0{slides.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute bottom-8 right-6 z-20 flex items-center gap-3 sm:bottom-12 sm:right-12 lg:right-20">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#174C3A]/25 bg-white/85 text-xl text-[#174C3A] shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#174C3A] hover:bg-[#174C3A] hover:text-white sm:h-14 sm:w-14"
          >
            &#8592;
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#174C3A]/25 bg-white/85 text-xl text-[#174C3A] shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#174C3A] hover:bg-[#174C3A] hover:text-white sm:h-14 sm:w-14"
          >
            &#8594;
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-6 z-20 flex items-center gap-2 sm:left-10 lg:left-16">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeSlide === index
                  ? "w-10 bg-[#174C3A]"
                  : "w-4 bg-[#174C3A]/30 hover:bg-[#174C3A]/70"
              }`}
            />
          ))}
        </div>

        {/* Bottom Progress Border */}
        <div className="absolute bottom-0 left-0 z-20 h-[3px] w-full bg-[#174C3A]/10">
          <div
            className="h-full bg-[#B58A42] transition-all duration-700"
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
