import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import {
  FiCalendar,
  FiShoppingBag,
  FiUser,
  FiMail,
  FiArrowLeft,
  FiCheckCircle,
} from "react-icons/fi";

import { AuthContext } from "../../AuthProvider/AuthProvider";

const API_URL = "https://abrars-dine-server.onrender.com";

const FoodPurchase = () => {
  const food = useLoaderData();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [buyingDate, setBuyingDate] = useState("");
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F1E8]">
        <span className="loading loading-spinner loading-lg text-[#174C3A]"></span>
      </div>
    );
  }

  if (!food || !food._id) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-[#174C3A]">Food Not Found</h2>
        <p className="mt-2 text-gray-600">
          The selected food item could not be found.
        </p>
        <button
          onClick={() => navigate("/allFood")}
          className="mt-5 rounded-xl bg-[#174C3A] px-6 py-3 font-semibold text-white"
        >
          Browse Foods
        </button>
      </div>
    );
  }

  const { _id, name, price, image, category, origin, quantity } = food;

  const handlePurchase = async (event) => {
    event.preventDefault();

    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in before purchasing this food.",
        icon: "warning",
        confirmButtonColor: "#174C3A",
      });
      navigate("/login", {
        state: {
          from: {
            pathname: window.location.pathname,
          },
        },
      });
      return;
    }

    if (!buyingDate) {
      Swal.fire({
        title: "Select a Date",
        text: "Please select your preferred buying date.",
        icon: "info",
        confirmButtonColor: "#174C3A",
      });
      return;
    }

    const selectedQuantity = Number(purchaseQuantity);

    if (!Number.isInteger(selectedQuantity) || selectedQuantity < 1) {
      Swal.fire({
        title: "Invalid Quantity",
        text: "Please enter a valid quantity.",
        icon: "warning",
        confirmButtonColor: "#174C3A",
      });
      return;
    }

    const orderData = {
      quantity: selectedQuantity,
      buyingDate,
      buyerName: user.displayName || user.email || "Customer",
      buyerEmail: user.email,
    };

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_URL}/foodPurchase/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Your purchase could not be completed.",
        );
      }

      const result = await Swal.fire({
        title: "Purchase Successful!",
        text: "Your order has been placed successfully.",
        icon: "success",
        confirmButtonText: "View My Orders",
        confirmButtonColor: "#174C3A",
      });

      if (result.isConfirmed) {
        navigate("/myOrder");
      }
    } catch (error) {
      console.error("Purchase Error:", error);

      Swal.fire({
        title: "Purchase Failed",
        text: error.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#174C3A",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Food Purchase | Abrar's Dine</title>
        <meta
          name="description"
          content="Purchase your favourite food from Abrar's Dine."
        />
      </Helmet>

      <section className="min-h-screen bg-[#F5F1E8] px-4 py-12 md:px-8">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 font-semibold text-[#174C3A] transition hover:text-[#B58A42]"
          >
            <FiArrowLeft />
            Back
          </button>

          <div className="grid overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
            {/* Food Preview */}
            <div className="bg-[#174C3A] p-6 text-white md:p-10">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={image}
                  alt={name}
                  className="h-72 w-full object-cover md:h-96"
                />
              </div>

              <div className="mt-7">
                <span className="rounded-full bg-[#B58A42] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  {category || "Featured Food"}
                </span>

                <h1 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">
                  {name}
                </h1>

                <p className="mt-3 text-sm text-white/75">
                  Origin: {origin || "Not specified"}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-white/20 pt-6">
                  <div>
                    <p className="text-sm text-white/70">Price per item</p>
                    <p className="mt-1 text-3xl font-bold text-[#E7C98C]">
                      ৳{price}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-white/70">Available quantity</p>
                    <p className="mt-1 text-xl font-semibold">
                      {quantity ?? "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Form */}
            <div className="p-6 md:p-10 lg:p-12">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B58A42]">
                  Complete Your Order
                </span>

                <h2 className="mt-3 text-3xl font-bold text-[#174C3A]">
                  Food Purchase
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Please review your information and confirm your purchase.
                </p>
              </div>

              <form onSubmit={handlePurchase} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Customer Name
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5">
                    <FiUser className="text-[#174C3A]" />
                    <input
                      type="text"
                      value={user?.displayName || "Customer"}
                      readOnly
                      className="w-full bg-transparent text-gray-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5">
                    <FiMail className="text-[#174C3A]" />
                    <input
                      type="email"
                      value={user?.email || ""}
                      readOnly
                      className="w-full bg-transparent text-gray-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Purchase Quantity
                  </label>

                  <input
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={purchaseQuantity}
                    onChange={(e) => setPurchaseQuantity(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none transition focus:border-[#174C3A] focus:ring-2 focus:ring-[#174C3A]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Buying Date
                  </label>

                  <div className="relative">
                    <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#174C3A]" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={buyingDate}
                      onChange={(e) => setBuyingDate(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 outline-none transition focus:border-[#174C3A] focus:ring-2 focus:ring-[#174C3A]/10"
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-[#F5F1E8] p-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Price per item</span>
                    <span>৳{price}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                    <span>Quantity</span>
                    <span>{Number(purchaseQuantity) || 0}</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#174C3A]/10 pt-4">
                    <span className="font-bold text-[#174C3A]">
                      Total Amount
                    </span>

                    <span className="text-2xl font-bold text-[#174C3A]">
                      ৳
                      {(
                        Number(price || 0) * (Number(purchaseQuantity) || 0)
                      ).toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#174C3A] px-6 py-4 font-bold text-white shadow-lg transition hover:bg-[#10392C] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiShoppingBag />
                      Confirm Purchase
                      <FiCheckCircle />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FoodPurchase;
