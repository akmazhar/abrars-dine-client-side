import { useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import {
  FiCoffee,
  FiTag,
  FiGlobe,
  FiDollarSign,
  FiPackage,
  FiImage,
  FiFileText,
  FiPlus,
  FiArrowRight,
} from "react-icons/fi";
import "./AddFood.css";

const AddFood = () => {
  const [loading, setLoading] = useState(false);

  const handleAddFood = async (event) => {
    event.preventDefault();

    const form = event.target;

    const newAllFood = {
      name: form.name.value.trim(),
      category: form.category.value.trim(),
      price: form.price.value,
      quantity: form.quantity.value,
      origin: form.origin.value.trim(),
      description: form.description.value.trim(),
      image: form.image.value.trim(),
    };

    setLoading(true);

    try {
      const response = await fetch(
        "https://restaurant-management-server-three.vercel.app/myAddedFood",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newAllFood),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add food. Please try again.");
      }

      const data = await response.json();

      if (data.insertedId) {
        await Swal.fire({
          title: "Deliciously Done!",
          text: "Your new food item has been added successfully.",
          icon: "success",
          confirmButtonText: "Wonderful!",
          confirmButtonColor: "#059669",
          background: "#ffffff",
          color: "#1f2937",
        });

        form.reset();
      } else {
        throw new Error("Food could not be added to the database.");
      }
    } catch (error) {
      console.error("Add Food Error:", error);

      Swal.fire({
        title: "Something Went Wrong!",
        text: error.message || "Unable to add food. Please try again.",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="add-food-page">
      <Helmet>
        <title>Abrar's Dine | Add Food</title>
        <meta
          name="description"
          content="Add delicious food items to the Abrar's Dine restaurant collection."
        />
      </Helmet>

      {/* HERO VIDEO SECTION */}

      <section className="add-food-hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="add-food-video"
          aria-label="Restaurant food presentation"
        >
          <source src="/add.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="add-food-video-overlay"></div>

        <div className="add-food-hero-content">
          <span className="hero-eyebrow">
            <FiCoffee />
            ABRAR'S DINE · FOOD COLLECTION
          </span>

          <h1>
            Share Your Taste.
            <br />
            <span>Inspire the World.</span>
          </h1>

          <p>
            Every great dish tells a story. Bring your favourite flavours to our
            table and share something delicious.
          </p>

          <a href="#add-food-form" className="hero-scroll-link">
            Add Your Food <FiArrowRight />
          </a>
        </div>

        <div className="hero-bottom-label">GOOD FOOD · GREAT EXPERIENCES</div>
      </section>

      {/* FORM SECTION */}

      <section className="add-food-section" id="add-food-form">
        <div className="add-food-card">
          {/* FORM HEADER */}

          <div className="add-food-header">
            <div className="add-food-icon">
              <FiPlus />
            </div>

            <div>
              <span className="section-eyebrow">EXPAND YOUR COLLECTION</span>

              <h2>Add Your Food</h2>

              <p>Globally Delicious. Locally Inspired.</p>
            </div>
          </div>

          <div className="add-food-divider"></div>

          <form onSubmit={handleAddFood} className="add-food-form">
            {/* FOOD NAME & CATEGORY */}

            <div className="form-grid">
              <div className="add-field">
                <label htmlFor="food-name">
                  <FiCoffee />
                  Food Name
                  <span>*</span>
                </label>

                <input
                  id="food-name"
                  type="text"
                  name="name"
                  placeholder="e.g. Grilled Chicken"
                  required
                  maxLength={100}
                />
              </div>

              <div className="add-field">
                <label htmlFor="food-category">
                  <FiTag />
                  Food Category
                  <span>*</span>
                </label>

                <input
                  id="food-category"
                  type="text"
                  name="category"
                  placeholder="e.g. Main Course"
                  required
                  maxLength={60}
                />
              </div>
            </div>

            {/* DESCRIPTION */}

            <div className="add-field full-field">
              <label htmlFor="food-description">
                <FiFileText />
                Short Description
                <span>*</span>
              </label>

              <textarea
                id="food-description"
                name="description"
                placeholder="Describe the ingredients, taste and speciality of your food..."
                rows="4"
                required
                maxLength={1000}
              ></textarea>

              <span className="field-hint">
                Write a short and attractive description of your dish.
              </span>
            </div>

            {/* ORIGIN, PRICE & QUANTITY */}

            <div className="form-grid three-column">
              <div className="add-field">
                <label htmlFor="food-origin">
                  <FiGlobe />
                  Food Origin
                  <span>*</span>
                </label>

                <input
                  id="food-origin"
                  type="text"
                  name="origin"
                  placeholder="e.g. Bangladesh"
                  required
                  maxLength={100}
                />
              </div>

              <div className="add-field">
                <label htmlFor="food-price">
                  <FiDollarSign />
                  Price
                  <span>*</span>
                </label>

                <input
                  id="food-price"
                  type="number"
                  name="price"
                  placeholder="e.g. 450"
                  min="0"
                  step="any"
                  required
                />
              </div>

              <div className="add-field">
                <label htmlFor="food-quantity">
                  <FiPackage />
                  Quantity
                  <span>*</span>
                </label>

                <input
                  id="food-quantity"
                  type="number"
                  name="quantity"
                  placeholder="e.g. 25"
                  min="0"
                  step="1"
                  required
                />
              </div>
            </div>

            {/* IMAGE URL */}

            <div className="add-field full-field">
              <label htmlFor="food-image">
                <FiImage />
                Food Image URL
                <span>*</span>
              </label>

              <input
                id="food-image"
                type="url"
                name="image"
                placeholder="https://example.com/your-food-image.jpg"
                required
              />

              <span className="field-hint">
                Paste a publicly accessible image URL.
              </span>
            </div>

            {/* SUBMIT BUTTON */}

            <div className="add-food-submit-area">
              <p>
                <span className="required-star">*</span>
                All fields are required.
              </p>

              <button
                type="submit"
                className="add-food-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="add-food-spinner"></span>
                    Adding Your Food...
                  </>
                ) : (
                  <>
                    <FiPlus />
                    Add Delicious Food
                    <FiArrowRight className="submit-arrow" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* CARD FOOTER */}

          <div className="add-food-footer">
            <span>
              <FiCoffee />
              ABRAR'S DINE
            </span>

            <p>Made for food lovers, with passion.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AddFood;
