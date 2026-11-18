import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./UpdateFood.css";

// Local development API
//const API_URL = "http://localhost:5000";

// Live backend ব্যবহার করতে চাইলে:
const API_URL = "https://abrars-dine-server.onrender.com";

const UpdateFood = () => {
  const dish = useLoaderData();
  const navigate = useNavigate();

  const { _id, name, category, origin, price, image } = dish || {};

  const [imageUrl, setImageUrl] = useState(image || "");
  const [updating, setUpdating] = useState(false);

  const escapeHtml = (value = "") =>
    String(value).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        })[char],
    );

  const handleUpdateFood = async (event) => {
    event.preventDefault();

    if (!_id) {
      await Swal.fire({
        title: "Food Not Found",
        text: "Unable to identify the food item.",
        icon: "error",
        confirmButtonColor: "#174C3A",
      });
      return;
    }

    const form = event.currentTarget;

    const updatedFood = {
      name: form.elements.name.value.trim(),
      category: form.elements.category.value.trim(),
      origin: form.elements.origin.value.trim(),
      price: form.elements.price.value.trim(),
      image: form.elements.image.value.trim(),
    };

    if (
      !updatedFood.name ||
      !updatedFood.category ||
      !updatedFood.origin ||
      !updatedFood.price ||
      !updatedFood.image
    ) {
      await Swal.fire({
        title: "Incomplete Information",
        text: "Please complete all fields before updating.",
        icon: "warning",
        confirmButtonColor: "#174C3A",
      });
      return;
    }

    if (
      !Number.isFinite(Number(updatedFood.price)) ||
      Number(updatedFood.price) < 0
    ) {
      await Swal.fire({
        title: "Invalid Price",
        text: "Please enter a valid non-negative price.",
        icon: "warning",
        confirmButtonColor: "#174C3A",
      });
      return;
    }

    try {
      setUpdating(true);

      const response = await fetch(`${API_URL}/updateFood/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFood),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to update food information.");
      }

      if (result.modifiedCount > 0) {
        const safeName = escapeHtml(updatedFood.name);
        const safeCategory = escapeHtml(updatedFood.category);
        const safeOrigin = escapeHtml(updatedFood.origin);
        const safePrice = Number(updatedFood.price).toLocaleString("en-BD");

        const alertResult = await Swal.fire({
          width: 460,
          padding: "30px 25px 25px",
          background: "#FFFEFA",
          color: "#24382E",
          html: `
            <div class="premium-alert-content">

              <div class="premium-alert-icon">
                <svg viewBox="0 0 24 24" width="42" height="42"
                  fill="none" stroke="currentColor"
                  stroke-width="2.5" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </div>

              <span class="premium-alert-eyebrow">
                ABRAR'S DINE MANAGEMENT
              </span>

              <h2>Successfully Updated!</h2>

              <p class="premium-alert-description">
                Your food information has been updated successfully.
                Your culinary collection is now up to date.
              </p>

              <div class="premium-food-summary">
                <div class="premium-food-summary-row">
                  <span>Food Name</span>
                  <strong>${safeName}</strong>
                </div>

                <div class="premium-food-summary-row">
                  <span>Category</span>
                  <strong>${safeCategory}</strong>
                </div>

                <div class="premium-food-summary-row">
                  <span>Origin</span>
                  <strong>${safeOrigin}</strong>
                </div>

                <div class="premium-food-summary-row">
                  <span>Price</span>
                  <strong>$${safePrice}</strong>
                </div>
              </div>

              <p class="premium-alert-footer">
                Excellence is in every detail.
              </p>

            </div>
          `,
          showCancelButton: true,
          confirmButtonText: "Go to Home →",
          cancelButtonText: "Explore All Foods",
          confirmButtonColor: "#174C3A",
          cancelButtonColor: "#B58A42",
          customClass: {
            popup: "premium-purchase-popup",
            confirmButton: "premium-home-button",
            cancelButton: "premium-food-button",
          },
          buttonsStyling: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          reverseButtons: true,
        });

        // Navigation must remain inside the success condition.
        if (alertResult.isConfirmed) {
          navigate("/", { replace: true });
        } else if (alertResult.dismiss === Swal.DismissReason.cancel) {
          navigate("/allFood", { replace: true });
        }
      } else if (result.matchedCount > 0) {
        await Swal.fire({
          title: "No Changes Detected",
          text: "The food information remains unchanged.",
          icon: "info",
          confirmButtonColor: "#174C3A",
          background: "#F5F1E8",
          color: "#24382E",
        });
      } else {
        throw new Error("Food item was not found.");
      }
    } catch (error) {
      console.error("Update Food Error:", error);

      await Swal.fire({
        title: "Update Failed",
        text: error.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#174C3A",
        background: "#F5F1E8",
        color: "#24382E",
      });
    } finally {
      setUpdating(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#D9D3C5] bg-[#FCFBF8] px-4 py-3.5 text-sm font-medium text-[#24382E] outline-none transition-all duration-300 placeholder:text-[#A6ADA6] hover:border-[#B58A42]/60 focus:border-[#174C3A] focus:bg-white focus:ring-4 focus:ring-[#174C3A]/10";

  return (
    <>
      <Helmet>
        <title>Abrar's Dine | Update Food</title>
        <meta
          name="description"
          content="Update and manage your food information at Abrar's Dine."
        />
      </Helmet>

      <main className="min-h-screen bg-[#F5F1E8] pb-16">
        {/* HERO SECTION */}
        <section className="relative min-h-[300px] overflow-hidden bg-[#10392C] sm:min-h-[350px]">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          >
            <source src="/2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-r from-[#10392C]/95 via-[#10392C]/85 to-[#10392C]/65" />

          <div className="relative mx-auto flex min-h-[300px] max-w-7xl items-center px-5 py-14 sm:min-h-[350px] sm:px-8 lg:px-12">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D8B56D]/40 bg-white/10 px-4 py-2 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#E8C77D]" />
                <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#E8C77D] sm:text-[10px]">
                  Abrar's Dine Management
                </span>
              </div>

              <h1 className="font-serif text-4xl font-bold leading-tight text-[#F5F1E8] sm:text-5xl md:text-6xl">
                Refine Your
                <span className="block italic text-[#D8B56D]">
                  Culinary Creation
                </span>
              </h1>

              <div className="my-5 flex items-center gap-2">
                <span className="h-[2px] w-12 bg-[#B58A42]" />
                <span className="h-2 w-2 rotate-45 bg-[#B58A42]" />
              </div>

              <p className="max-w-lg text-sm leading-7 text-white/75 sm:text-base">
                Keep your food collection up to date. Refine the details, update
                the presentation, and maintain your culinary standards.
              </p>
            </div>
          </div>
        </section>

        {/* UPDATE FORM */}
        <section className="mx-auto -mt-8 max-w-5xl px-4 sm:px-8">
          <div className="relative z-10 overflow-hidden rounded-[25px] border border-[#B58A42]/25 bg-white shadow-[0_20px_65px_rgba(36,56,46,0.10)] sm:rounded-[30px]">
            {/* FORM HEADER */}
            <div className="border-b border-[#B58A42]/20 bg-gradient-to-r from-[#FCFBF8] to-[#F5F1E8] px-5 py-7 sm:px-9 sm:py-9">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="mb-2 text-[9px] font-extrabold uppercase tracking-[0.23em] text-[#A18A60]">
                    Food Information
                  </p>

                  <h2 className="font-serif text-2xl font-bold text-[#24382E] sm:text-3xl">
                    Update Food Details
                  </h2>

                  <p className="mt-2 text-xs leading-6 text-[#829087] sm:text-sm">
                    Edit the information below to update your food item.
                  </p>
                </div>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#B58A42]/25 bg-white text-2xl shadow-sm">
                  🍽️
                </div>
              </div>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleUpdateFood}
              className="space-y-7 p-5 sm:p-9 lg:p-10"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="food-name"
                    className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-[#526358]"
                  >
                    Food Name
                  </label>

                  <input
                    id="food-name"
                    type="text"
                    name="name"
                    defaultValue={name}
                    placeholder="Enter food name"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="food-category"
                    className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-[#526358]"
                  >
                    Food Category
                  </label>

                  <input
                    id="food-category"
                    type="text"
                    name="category"
                    defaultValue={category}
                    placeholder="e.g. Italian, Thai, Bengali"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="food-price"
                    className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-[#526358]"
                  >
                    Price ($)
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-serif text-lg font-bold text-[#A18A60]">
                      $
                    </span>

                    <input
                      id="food-price"
                      type="number"
                      name="price"
                      min="0"
                      step="0.01"
                      defaultValue={price}
                      placeholder="Enter food price"
                      className={`${inputClass} pl-9`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="food-origin"
                    className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-[#526358]"
                  >
                    Food Origin
                  </label>

                  <input
                    id="food-origin"
                    type="text"
                    name="origin"
                    defaultValue={origin}
                    placeholder="Enter food origin"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* IMAGE URL */}
              <div>
                <label
                  htmlFor="food-image"
                  className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-[#526358]"
                >
                  Food Image URL
                </label>

                <input
                  id="food-image"
                  type="url"
                  name="image"
                  defaultValue={image}
                  placeholder="https://example.com/food-image.jpg"
                  className={inputClass}
                  onChange={(event) => setImageUrl(event.target.value)}
                  required
                />

                <p className="mt-2 text-[10px] leading-5 text-[#829087]">
                  Provide a valid, publicly accessible image URL.
                </p>
              </div>

              {/* IMAGE PREVIEW */}
              {imageUrl && (
                <div className="overflow-hidden rounded-2xl border border-[#B58A42]/25 bg-[#F5F1E8] p-3 sm:p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[9px] font-extrabold uppercase tracking-widest text-[#A18A60]">
                      Image Preview
                    </p>

                    <span className="rounded-full bg-[#174C3A]/10 px-3 py-1 text-[9px] font-bold text-[#174C3A]">
                      Preview
                    </span>
                  </div>

                  <img
                    src={imageUrl}
                    alt="Food preview"
                    className="h-48 w-full rounded-xl object-cover sm:h-64"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                    onLoad={(event) => {
                      event.currentTarget.style.display = "block";
                    }}
                  />
                </div>
              )}

              <div className="h-px bg-gradient-to-r from-transparent via-[#B58A42]/40 to-transparent" />

              {/* SUBMIT BUTTON */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[10px] leading-5 text-[#829087] sm:max-w-xs">
                  Please review all information carefully before submitting your
                  changes.
                </p>

                <button
                  type="submit"
                  disabled={updating}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#174C3A] to-[#216448] px-8 py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white shadow-[0_10px_25px_rgba(23,76,58,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(23,76,58,0.25)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[220px]"
                >
                  {updating ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Updating...
                    </>
                  ) : (
                    <>
                      Update Food Details
                      <span className="text-lg">→</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="h-1 bg-gradient-to-r from-[#174C3A] via-[#B58A42] to-[#174C3A]" />
          </div>

          {/* FOOTER */}
          <div className="mt-8 text-center">
            <p className="font-serif text-lg italic text-[#947039]">
              "Excellence is in every detail."
            </p>

            <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.25em] text-[#829087]">
              The Abrar's Dine Experience
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default UpdateFood;
