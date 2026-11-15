import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = "https://restaurant-management-server-three.vercel.app";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ordering, setOrdering] = useState(false);

  // Fetch Food Details
  useEffect(() => {
    const controller = new AbortController();

    const fetchFood = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/dish/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load food details.");
        }

        const data = await response.json();

        if (!data || (!data._id && !data.name)) {
          throw new Error("Food item not found.");
        }

        setFood(data);
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

    fetchFood();

    return () => controller.abort();
  }, [id]);

  // Handle Order
  const myOrderHandle = async () => {
    if (!food || ordering) return;

    try {
      setOrdering(true);

      const oneCart = {
        image: food.image,
        name: food.name,
        category: food.category,
        chef: food.chef,
        price: food.price,
        quantity: food.quantity,
        origin: food.origin,
        description: food.description,
      };

      const response = await fetch(`${API_URL}/myOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(oneCart),
      });

      if (!response.ok) {
        throw new Error("Your order could not be processed.");
      }

      const data = await response.json();

      if (data.insertedId) {
        await Swal.fire({
          title: "Order Confirmed!",
          text: `${food.name} has been successfully added to your order.`,
          icon: "success",
          confirmButtonText: "View My Orders",
          confirmButtonColor: "#174C3A",
          background: "#F5F1E8",
          color: "#24382E",
        });

        navigate("/myOrder");
      } else {
        throw new Error(data.message || "Unable to confirm your order.");
      }
    } catch (err) {
      Swal.fire({
        title: "Order Unsuccessful",
        text: err.message || "Please try again later.",
        icon: "error",
        confirmButtonColor: "#174C3A",
      });
    } finally {
      setOrdering(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F5F1E8]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-[#174C3A]"></span>
          <p className="mt-4 font-serif text-sm tracking-wider text-[#174C3A]">
            Preparing Your Experience...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !food) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F5F1E8] px-5">
        <div className="max-w-md rounded-3xl border border-[#B58A42]/30 bg-white p-8 text-center shadow-xl sm:p-12">
          <div className="mb-5 text-5xl">🍽️</div>

          <h2 className="font-serif text-2xl font-bold text-[#24382E]">
            Food Not Found
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#68766C]">
            {error || "Sorry, this delicious item is currently unavailable."}
          </p>

          <Link
            to="/AllFood"
            className="mt-7 inline-flex rounded-full bg-[#174C3A] px-7 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#216448]"
          >
            Explore Our Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{food.name} | Abrar's Dine - Food Details</title>
        <meta
          name="description"
          content={food.description || `Discover ${food.name} at Abrar's Dine.`}
        />
      </Helmet>

      <main className="min-h-screen overflow-hidden bg-[#F5F1E8] px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-10 lg:pb-24">
        {/* Background Decoration */}
        <div className="pointer-events-none fixed right-0 top-32 -z-0 h-72 w-72 rounded-full bg-[#B58A42]/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-7 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#829087] sm:mb-10 sm:text-xs">
            <Link to="/" className="transition hover:text-[#174C3A]">
              Home
            </Link>

            <span>/</span>

            <Link to="/AllFood" className="transition hover:text-[#174C3A]">
              Our Menu
            </Link>

            <span>/</span>

            <span className="max-w-[150px] truncate text-[#B58A42]">
              {food.name}
            </span>
          </div>

          {/* Main Showcase */}
          <div className="grid overflow-hidden rounded-[25px] border border-[#B58A42]/20 bg-white shadow-[0_20px_70px_rgba(36,56,46,0.09)] lg:grid-cols-2 lg:rounded-[35px]">
            {/* Food Image Section */}
            <div className="relative min-h-[300px] overflow-hidden bg-[#EAE5D9] sm:min-h-[420px] lg:min-h-[620px]">
              <img
                src={food.image}
                alt={food.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#142D22]/75 via-transparent to-black/10" />

              {/* Image Label */}
              <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E8C77D]" />
                  Signature Selection
                </span>
              </div>

              {/* Image Bottom Content */}
              <div className="absolute bottom-6 left-5 right-5 sm:bottom-9 sm:left-8 sm:right-8">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.25em] text-[#E8C77D] sm:text-[10px]">
                  A Taste Worth Remembering
                </p>

                <h2 className="max-w-lg font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {food.name}
                </h2>

                <div className="mt-4 h-[2px] w-14 bg-[#D5B16D]" />
              </div>
            </div>

            {/* Food Information */}
            <div className="flex flex-col justify-center bg-gradient-to-br from-white to-[#F9F7F1] px-5 py-8 sm:px-9 sm:py-11 lg:px-12 lg:py-14 xl:px-16">
              {/* Section Label */}
              <div className="mb-5 flex items-center gap-2">
                <span className="h-[2px] w-8 bg-[#B58A42]" />

                <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#947039]">
                  Discover The Experience
                </span>
              </div>

              {/* Food Name */}
              <h1 className="font-serif text-3xl font-bold leading-[1.15] tracking-tight text-[#24382E] sm:text-4xl xl:text-5xl">
                {food.name}
              </h1>

              <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-[#8A9188]">
                {food.category}
              </p>

              {/* Decorative Divider */}
              <div className="my-6 flex items-center gap-2 sm:my-8">
                <span className="h-[2px] w-10 bg-[#B58A42]" />
                <span className="h-1.5 w-1.5 rotate-45 bg-[#B58A42]" />
                <span className="h-px w-10 bg-[#B58A42]/40" />
              </div>

              {/* Description */}
              <div>
                <h3 className="mb-3 font-serif text-lg font-bold text-[#174C3A]">
                  About This Dish
                </h3>

                <p className="text-[13px] leading-[1.9] text-[#68766C] sm:text-sm sm:leading-8">
                  {food.description ||
                    "A delicious selection prepared with care and attention to flavor."}
                </p>
              </div>

              {/* Food Information Cards */}
              <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
                <div className="rounded-2xl border border-[#174C3A]/10 bg-[#F5F1E8]/70 p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#947039]">
                    Category
                  </p>

                  <p className="mt-2 break-words font-serif text-sm font-bold text-[#174C3A] sm:text-base">
                    {food.category || "Special Dish"}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#174C3A]/10 bg-[#F5F1E8]/70 p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#947039]">
                    Origin
                  </p>

                  <p className="mt-2 break-words font-serif text-sm font-bold text-[#174C3A] sm:text-base">
                    {food.origin || "Not specified"}
                  </p>
                </div>

                <div className="col-span-2 rounded-2xl border border-[#174C3A]/10 bg-[#F5F1E8]/70 p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#947039]">
                    Prepared By
                  </p>

                  <p className="mt-2 font-serif text-base font-bold text-[#174C3A]">
                    {food.chef || "Abrar's Dine Kitchen"}
                  </p>
                </div>
              </div>

              {/* Price Section */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#B58A42]/25 pt-6 sm:mt-9">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A9188]">
                    Experience This Delight
                  </p>

                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-serif text-2xl font-bold text-[#174C3A] sm:text-3xl">
                      ${food.price}
                    </span>

                    <span className="text-[10px] text-[#8A9188]">/ Item</span>
                  </div>
                </div>

                <span className="rounded-full border border-[#B58A42]/40 bg-[#B58A42]/10 px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-[#947039]">
                  Premium Quality
                </span>
              </div>

              {/* Order Button */}
              <button
                type="button"
                onClick={myOrderHandle}
                disabled={ordering}
                className="group mt-7 flex w-full items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#174C3A] to-[#216448] px-6 py-4 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_12px_28px_rgba(23,76,58,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(23,76,58,0.28)] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-8 sm:py-[18px] sm:text-xs"
              >
                {ordering ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Processing Order...
                  </>
                ) : (
                  <>
                    Order This Delight
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#174C3A]">
                      →
                    </span>
                  </>
                )}
              </button>

              {/* Back to Menu */}
              <Link
                to="/AllFood"
                className="mt-5 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#68766C] transition hover:text-[#174C3A]"
              >
                ← Back to Our Menu
              </Link>

              {/* Brand Signature */}
              <div className="mt-8 border-t border-[#B58A42]/20 pt-5 text-center">
                <p className="font-serif text-lg font-bold tracking-wide text-[#174C3A]">
                  Abrar's Dine
                </p>

                <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.3em] text-[#A18A60]">
                  Taste • Quality • Tradition
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Brand Message */}
          <div className="mt-8 text-center sm:mt-10">
            <p className="font-serif text-sm italic text-[#829087] sm:text-base">
              Every dish tells a story. Every bite creates a memory.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Details;
