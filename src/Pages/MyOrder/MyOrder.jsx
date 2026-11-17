import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import axios from "axios";
import {
  FiShoppingBag,
  FiTrash2,
  FiRefreshCw,
  FiArrowRight,
} from "react-icons/fi";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import "./MyOrder.css";

const API_URL = "https://abrars-dine-server.onrender.com";

const MyOrder = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchOrders = async () => {
    if (!user?.email) return;

    try {
      setFetching(true);

      const response = await axios.get(
        `${API_URL}/myOrder?buyerEmail=${encodeURIComponent(user.email)}`,
      );

      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Order loading error:", error);

      Swal.fire(
        "Error",
        "Unable to load your orders. Please try again.",
        "error",
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!loading && user?.email) {
      fetchOrders();
    } else if (!loading) {
      setFetching(false);
    }
  }, [user, loading]);

  // Find the original food ID if an older order has no foodId.
  const handlePurchase = async (order) => {
    try {
      let foodId = order.foodId;

      // First check whether the stored foodId is valid.
      if (foodId) {
        try {
          const check = await axios.get(`${API_URL}/foodPurchase/${foodId}`);

          if (check.data?._id) {
            navigate(`/foodPurchase/${foodId}`);
            return;
          }
        } catch {
          foodId = null;
        }
      }

      // If foodId is missing, search the original food collection.
      const response = await axios.get(`${API_URL}/allfood`);
      const foods = Array.isArray(response.data) ? response.data : [];

      const matches = foods.filter((food) => {
        return (
          food.name === order.name &&
          (!order.image || food.image === order.image) &&
          (!order.category || food.category === order.category) &&
          (!order.origin || food.origin === order.origin)
        );
      });

      if (matches.length === 1 && matches[0]._id) {
        foodId = matches[0]._id;

        // Save the recovered ID in the existing order.
        await axios
          .patch(`${API_URL}/myOrder/${order._id}`, {
            foodId,
          })
          .catch(() => {});

        navigate(`/foodPurchase/${foodId}`);
        return;
      }

      Swal.fire({
        title: "Food Not Found",
        text:
          matches.length > 1
            ? "Multiple matching foods were found. Please contact support."
            : "The original food item could not be found. It may have been removed.",
        icon: "warning",
        confirmButtonColor: "#174C3A",
      });
    } catch (error) {
      console.error("Purchase navigation error:", error);

      Swal.fire(
        "Error",
        "Could not find the original food item. Please try again.",
        "error",
      );
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this order?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#174C3A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/myOrder/${id}`);

      setOrders((previous) => previous.filter((order) => order._id !== id));

      Swal.fire("Deleted!", "Your order has been removed.", "success");
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire("Error", "Unable to delete this order.", "error");
    }
  };

  if (loading || fetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F1E8] px-4 py-12 sm:px-6 lg:px-10">
      <Helmet>
        <title>My Orders | Abrar's Dine</title>
      </Helmet>

      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-[#B58A42]">
              Abrar's Dine
            </p>

            <h1 className="text-3xl font-bold text-[#10392C] sm:text-4xl">
              My Orders
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Manage and purchase your selected food items.
            </p>
          </div>

          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 rounded-xl bg-[#174C3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10392C]"
          >
            <FiRefreshCw />
            Refresh
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-20 text-center shadow-sm">
            <FiShoppingBag className="mx-auto mb-5 text-5xl text-[#B58A42]" />

            <h2 className="text-2xl font-bold text-[#10392C]">No Orders Yet</h2>

            <p className="mt-3 text-gray-500">
              Your selected food orders will appear here.
            </p>

            <button
              onClick={() => navigate("/allFood")}
              className="mt-7 rounded-xl bg-[#174C3A] px-7 py-3 font-semibold text-white hover:bg-[#10392C]"
            >
              Explore Foods
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {orders.map((order) => (
              <article
                key={order._id}
                className="overflow-hidden rounded-2xl border border-[#e8e1d4] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-56 overflow-hidden bg-gray-100">
                  <img
                    src={
                      order.image || "https://placehold.co/600x400?text=Food"
                    }
                    alt={order.name || "Food"}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <h2 className="text-xl font-bold text-[#10392C]">
                      {order.name || "Food Item"}
                    </h2>

                    <span className="rounded-full bg-[#F5F1E8] px-3 py-1 text-xs font-semibold text-[#174C3A]">
                      {order.category || "Food"}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <strong className="text-gray-800">Origin:</strong>{" "}
                      {order.origin || "N/A"}
                    </p>

                    <p>
                      <strong className="text-gray-800">Quantity:</strong>{" "}
                      {order.quantity || 1}
                    </p>

                    <p>
                      <strong className="text-gray-800">Price:</strong> ৳
                      {order.price ?? "N/A"}
                    </p>

                    <p>
                      <strong className="text-gray-800">Order Date:</strong>{" "}
                      {order.buyingDate || "N/A"}
                    </p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => handlePurchase(order)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#174C3A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#10392C]"
                    >
                      Purchase
                      <FiArrowRight />
                    </button>

                    <button
                      onClick={() => handleDelete(order._id)}
                      title="Delete Order"
                      className="rounded-xl border border-red-200 px-4 text-red-600 transition hover:bg-red-50"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyOrder;
