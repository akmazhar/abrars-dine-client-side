import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = "https://abrars-dine-server.onrender.com";

const Add = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  // Fetch Selected Food
  useEffect(() => {
    const controller = new AbortController();

    const fetchFood = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/myAddedFood/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load food details.");
        }

        const result = await response.json();

        if (!result || typeof result !== "object") {
          throw new Error("Food information is unavailable.");
        }

        setData(result);
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

    if (id) {
      fetchFood();
    } else {
      setError("Food ID is missing.");
      setLoading(false);
    }

    return () => controller.abort();
  }, [id]);

  // Add Food Handler
  const addFoodHandle = async () => {
    if (!data || adding) return;

    const oneCart = {
      food_image: data.food_image || data.image,
      food_name: data.food_name || data.name,
      price: data.price,
      food_category: data.food_category || data.category,
    };

    if (!oneCart.food_name || !oneCart.food_image) {
      Swal.fire({
        title: "Incomplete Information",
        text: "Food name or image is missing.",
        icon: "error",
        confirmButtonColor: "#174C3A",
      });

      return;
    }

    try {
      setAdding(true);

      const response = await fetch(`${API_URL}/myAddedFood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(oneCart),
      });

      const result = await response.json();

      if (!response.ok || !result.insertedId) {
        throw new Error(result.message || "Your food could not be added.");
      }

      await Swal.fire({
        title: "Successfully Added!",
        html: `
          <div style="font-family: Georgia, serif; color: #24382E;">
            <p style="font-size: 15px; line-height: 1.8;">
              <strong>${oneCart.food_name}</strong>
              has been successfully added to your food collection.
            </p>
          </div>
        `,
        icon: "success",
        confirmButtonText: "Wonderful!",
        confirmButtonColor: "#174C3A",
        background: "#F5F1E8",
        color: "#24382E",
      });
    } catch (err) {
      Swal.fire({
        title: "Unable to Add Food",
        text: err.message || "Please try again later.",
        icon: "error",
        confirmButtonColor: "#174C3A",
        background: "#F5F1E8",
        color: "#24382E",
      });
    } finally {
      setAdding(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F5F1E8]">
        <span className="loading loading-spinner loading-lg text-[#174C3A]" />

        <p className="mt-5 font-serif text-sm tracking-wider text-[#174C3A]">
          Preparing Your Selection...
        </p>
      </div>
    );
  }

  // Error State
  if (error || !data) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F5F1E8] px-5">
        <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-white px-6 py-14 text-center shadow-xl">
          <div className="mb-5 text-5xl">🍽️</div>

          <h2 className="font-serif text-2xl font-bold text-[#24382E]">
            Food Not Available
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#829087]">
            {error || "The requested food could not be found."}
          </p>

          <button
            onClick={() => window.history.back()}
            className="mt-7 rounded-full bg-[#174C3A] px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#216448]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const foodName = data.food_name || data.name;
  const foodImage = data.food_image || data.image;
  const foodCategory = data.food_category || data.category;

  return (
    <main className="min-h-screen bg-[#F5F1E8] pb-16">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-[#10392C]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(181,138,66,0.22),_transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 sm:py-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D8B56D]/40 bg-white/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#E8C77D]" />

            <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#E8C77D]">
              Abrar's Dine Selection
            </span>
          </div>

          <h1 className="font-serif text-4xl font-bold text-[#F5F1E8] sm:text-5xl md:text-6xl">
            A Taste of
            <span className="ml-2 italic text-[#D8B56D]">Excellence</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            Discover your selected culinary creation and add it to your personal
            collection.
          </p>

          <div className="mx-auto mt-6 flex w-20 items-center justify-center gap-2">
            <span className="h-[2px] flex-1 bg-[#B58A42]" />
            <span className="h-2 w-2 rotate-45 bg-[#B58A42]" />
            <span className="h-[2px] flex-1 bg-[#B58A42]" />
          </div>
        </div>
      </section>

      {/* ================= FOOD DETAILS ================= */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-8 md:pt-16">
        <div className="overflow-hidden rounded-[28px] border border-[#B58A42]/20 bg-white shadow-[0_20px_65px_rgba(36,56,46,0.09)]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* FOOD IMAGE */}
            <div className="relative min-h-[280px] overflow-hidden bg-[#EEE9DD] sm:min-h-[400px] lg:min-h-[540px]">
              <img
                src={foodImage}
                alt={foodName || "Selected Food"}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#10392C]/70 via-transparent to-black/10" />

              <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
                <span className="rounded-full border border-white/30 bg-white/90 px-5 py-2.5 text-[9px] font-extrabold uppercase tracking-widest text-[#174C3A] shadow-lg backdrop-blur-md">
                  {foodCategory || "Chef's Special"}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.25em] text-[#E8C77D]">
                  Crafted With Passion
                </p>

                <h2 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
                  {foodName}
                </h2>
              </div>
            </div>

            {/* FOOD INFORMATION */}
            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#A18A60]">
                A Special Culinary Experience
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#24382E] sm:text-4xl">
                {foodName || "Selected Food"}
              </h2>

              <div className="my-6 flex items-center gap-2">
                <span className="h-[2px] w-10 bg-[#B58A42]" />
                <span className="h-1.5 w-1.5 rotate-45 bg-[#B58A42]" />
                <span className="h-px w-10 bg-[#B58A42]/40" />
              </div>

              {/* CATEGORY */}
              <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-[#F5F1E8] px-4 py-4">
                <span className="text-xs font-semibold text-[#829087]">
                  Food Category
                </span>

                <span className="text-right text-sm font-bold text-[#174C3A]">
                  {foodCategory || "N/A"}
                </span>
              </div>

              {/* PRICE */}
              <div className="mb-6 rounded-2xl border border-[#B58A42]/25 bg-gradient-to-r from-[#F5F1E8] to-white p-5">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#A18A60]">
                  Our Special Price
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-bold text-[#174C3A]">
                    $ {data.price ?? "N/A"}
                  </span>

                  <span className="text-xs text-[#829087]">/ Selection</span>
                </div>
              </div>

              {/* ADD BUTTON */}
              <button
                type="button"
                onClick={addFoodHandle}
                disabled={adding}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#174C3A] to-[#216448] px-6 py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white shadow-[0_10px_25px_rgba(23,76,58,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(23,76,58,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {adding ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Adding Your Food...
                  </>
                ) : (
                  <>
                    Add To My Collection
                    <span className="text-lg transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>

              <p className="mt-5 text-center text-[10px] leading-6 text-[#829087]">
                A carefully selected addition to your Abrar's Dine food
                collection.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BRAND MESSAGE */}
        <div className="mt-8 text-center">
          <p className="font-serif text-lg italic text-[#947039]">
            "Good food creates beautiful memories."
          </p>

          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.25em] text-[#829087]">
            The Abrar's Dine Experience
          </p>
        </div>
      </section>
    </main>
  );
};

export default Add;
