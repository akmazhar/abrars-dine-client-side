import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiGlobe,
  FiMapPin,
  FiPackage,
  FiShoppingBag,
  FiTag,
  FiUser,
  FiCoffee,
  FiAward,
} from "react-icons/fi";
import "./Details.css";

const API_URL = "https://restaurant-management-server-three.vercel.app";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ordering, setOrdering] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fetch Food Details
  useEffect(() => {
    const controller = new AbortController();

    const fetchFood = async () => {
      try {
        setLoading(true);
        setError("");
        setFood(null);
        setImageError(false);

        const response = await fetch(`${API_URL}/dish/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "This food item could not be found."
              : "Unable to load food details. Please try again.",
          );
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
        background: "#F5F1E8",
        color: "#24382E",
      });
    } finally {
      setOrdering(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <main className="details-state-page">
        <div className="details-loading-card">
          <div className="details-loader">
            <FiCoffee />
          </div>

          <h2>Preparing Your Experience</h2>

          <p>We're bringing something delicious to your table...</p>

          <div className="details-loading-line">
            <span></span>
          </div>
        </div>
      </main>
    );
  }

  // Error State
  if (error || !food) {
    return (
      <main className="details-state-page px-4">
        <div className="details-error-card">
          <div className="details-error-icon">
            <FiCoffee />
          </div>

          <span className="details-eyebrow">ABRAR'S DINE</span>

          <h2>Food Not Found</h2>

          <p>
            {error || "Sorry, this delicious item is currently unavailable."}
          </p>

          <Link to="/AllFood" className="details-primary-link">
            <FiArrowLeft />
            Explore Our Menu
          </Link>
        </div>
      </main>
    );
  }

  const hasQuantity =
    food.quantity !== undefined &&
    food.quantity !== null &&
    food.quantity !== "";

  return (
    <>
      <Helmet>
        <title>{food.name} | Abrar's Dine - Food Details</title>

        <meta
          name="description"
          content={food.description || `Discover ${food.name} at Abrar's Dine.`}
        />
      </Helmet>

      <main className="details-page">
        {/* DECORATIVE BACKGROUND */}
        <div className="details-decoration details-decoration-one"></div>
        <div className="details-decoration details-decoration-two"></div>

        <div className="details-container">
          {/* BREADCRUMB */}
          <nav className="details-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>

            <span>/</span>

            <Link to="/AllFood">Our Menu</Link>

            <span>/</span>

            <span className="breadcrumb-current">{food.name}</span>
          </nav>

          {/* BACK LINK */}
          <Link to="/AllFood" className="details-back-link">
            <FiArrowLeft />
            Back to Our Collection
          </Link>

          {/* MAIN SHOWCASE */}
          <section className="details-showcase">
            {/* LEFT: FOOD IMAGE */}
            <div className="details-image-section">
              {!imageError && food.image ? (
                <img
                  src={food.image}
                  alt={food.name}
                  className="details-food-image"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="details-image-fallback">
                  <FiCoffee />
                  <p>Image Unavailable</p>
                </div>
              )}

              <div className="details-image-overlay"></div>

              {/* TOP BADGE */}
              <div className="details-image-badge">
                <span className="badge-dot"></span>
                Signature Selection
              </div>

              {/* IMAGE CONTENT */}
              <div className="details-image-content">
                <span className="image-caption">A TASTE WORTH REMEMBERING</span>

                <h2>{food.name}</h2>

                <div className="image-gold-line"></div>

                <p>Crafted with passion. Served with excellence.</p>
              </div>

              {/* IMAGE CORNER DECORATION */}
              <div className="image-corner-decoration"></div>
            </div>

            {/* RIGHT: FOOD INFORMATION */}
            <div className="details-information">
              {/* SECTION LABEL */}
              <div className="details-section-label">
                <span></span>
                DISCOVER THE EXPERIENCE
              </div>

              {/* FOOD TITLE */}
              <div className="details-title-area">
                <span className="details-category">
                  <FiTag />
                  {food.category || "Special Selection"}
                </span>

                <h1>{food.name}</h1>

                <p>
                  {food.description ||
                    "A delicious selection prepared with care and attention to flavor."}
                </p>
              </div>

              <div className="details-gold-divider">
                <span></span>
                <i></i>
                <span></span>
              </div>

              {/* FOOD FEATURES */}
              <div className="details-features">
                <div className="details-feature-card">
                  <div className="feature-icon">
                    <FiGlobe />
                  </div>

                  <div>
                    <span>FOOD ORIGIN</span>
                    <h3>{food.origin || "Not specified"}</h3>
                  </div>
                </div>

                <div className="details-feature-card">
                  <div className="feature-icon">
                    <FiPackage />
                  </div>

                  <div>
                    <span>QUANTITY</span>
                    <h3>{hasQuantity ? food.quantity : "Not specified"}</h3>
                  </div>
                </div>

                <div className="details-feature-card full-feature">
                  <div className="feature-icon">
                    <FiUser />
                  </div>

                  <div>
                    <span>PREPARED BY</span>
                    <h3>{food.chef || "Abrar's Dine Kitchen"}</h3>
                  </div>
                </div>
              </div>

              {/* PRICE */}
              <div className="details-price-section">
                <div>
                  <span className="price-caption">EXPERIENCE THIS DELIGHT</span>

                  <div className="details-price">
                    <span className="currency-symbol">$</span>
                    {food.price}
                    <small>/ Item</small>
                  </div>
                </div>

                <div className="premium-quality-badge">
                  <FiAward />
                  Premium Quality
                </div>
              </div>

              {/* ORDER BUTTON */}
              <button
                type="button"
                onClick={myOrderHandle}
                disabled={ordering}
                className="details-order-button"
              >
                {ordering ? (
                  <>
                    <span className="details-button-spinner"></span>
                    Processing Your Order...
                  </>
                ) : (
                  <>
                    <FiShoppingBag />
                    Order This Delight
                    <span className="order-arrow">
                      <FiArrowRight />
                    </span>
                  </>
                )}
              </button>

              {/* TRUST MESSAGE */}
              <div className="details-trust-message">
                <FiCheckCircle />
                <span>A memorable dining experience awaits you.</span>
              </div>

              {/* BRAND SIGNATURE */}
              <div className="details-brand-signature">
                <span>Abrar's Dine</span>

                <p>
                  TASTE <i>•</i> QUALITY <i>•</i> TRADITION
                </p>
              </div>
            </div>
          </section>

          {/* BOTTOM MESSAGE */}
          <div className="details-bottom-message">
            <span></span>

            <p>Every dish tells a story. Every bite creates a memory.</p>

            <span></span>
          </div>
        </div>
      </main>
    </>
  );
};

export default Details;
