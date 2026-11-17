import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiHome, FiSearch, FiCompass } from "react-icons/fi";

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>404 | Page Not Found - Abrar's Dine</title>
        <meta
          name="description"
          content="Oops! The page you are looking for could not be found. Return to Abrar's Dine homepage and continue exploring."
        />
      </Helmet>

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F1E8] px-4 py-12 sm:px-6 lg:px-8">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#174C3A]/5 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#B58A42]/10 blur-3xl" />

        {/* Main Content */}
        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
          {/* Brand Identity */}
          <Link
            to="/"
            className="mb-10 inline-flex items-center justify-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#174C3A] text-xl font-extrabold text-white shadow-lg">
              A
            </div>

            <div className="text-left">
              <h2 className="text-lg font-extrabold tracking-wide text-[#174C3A] sm:text-xl">
                ABRAR'S DINE
              </h2>

              <p className="text-[9px] font-semibold uppercase tracking-[3px] text-[#B58A42]">
                Taste of Excellence
              </p>
            </div>
          </Link>

          {/* Error Illustration */}
          <div className="relative mx-auto mb-8 w-full max-w-[520px]">
            {/* Decorative Circle */}
            <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#B58A42]/20" />

            <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#174C3A]/5" />

            <img
              src="https://i.ibb.co/sKLmbxp/error.png"
              alt="404 Page Not Found illustration"
              className="relative z-10 mx-auto h-auto w-full object-contain drop-shadow-xl"
            />
          </div>

          {/* Error Message */}
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#B58A42]/30 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[2px] text-[#B58A42] shadow-sm">
              <FiCompass />
              Lost Your Way?
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-[#174C3A] sm:text-5xl md:text-6xl">
              Oops! Page
              <span className="block text-[#B58A42]">Not Found.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-gray-500 sm:text-base sm:leading-8">
              The page you're looking for may have been moved, deleted, or is
              temporarily unavailable. Don't worry — there's plenty more to
              explore at Abrar's Dine.
            </p>

            {/* Action Buttons */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/"
                className="group inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#174C3A] px-8 py-4 text-sm font-bold tracking-wide text-white shadow-lg shadow-[#174C3A]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#10392C] hover:shadow-xl sm:w-auto"
              >
                <FiHome className="text-lg" />
                Go to Homepage
                <FiArrowLeft className="rotate-180 text-lg transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl border border-[#174C3A]/20 bg-white px-8 py-4 text-sm font-bold text-[#174C3A] transition-all duration-300 hover:-translate-y-1 hover:border-[#174C3A] hover:bg-[#174C3A]/5 sm:w-auto"
              >
                <FiArrowLeft className="text-lg" />
                Go Back
              </button>
            </div>

            {/* Additional Message */}
            <div className="mt-12 border-t border-[#174C3A]/10 pt-7">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <FiSearch className="text-[#B58A42]" />
                <span>Looking for something delicious?</span>
              </div>

              <Link
                to="/allFood"
                className="mt-2 inline-block text-sm font-bold text-[#174C3A] underline decoration-[#B58A42] underline-offset-4 transition hover:text-[#B58A42]"
              >
                Explore Our Food Collection
              </Link>
            </div>

            {/* Footer */}
            <p className="mt-10 text-xs font-medium tracking-wide text-gray-400">
              © {new Date().getFullYear()} Abrar's Dine. All Rights Reserved.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
