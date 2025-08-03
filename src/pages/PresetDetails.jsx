import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { presetSections } from "../data/presetsData";
import { useCart } from "../context/CartContext"; // <-- Import the useCart hook

// Helper function for formatting stars
function Stars({ rating }) {
  return (
    <span className="text-yellow-400">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

export default function PresetDetails() {
  const { section, preset } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // <-- Use CartContext's addToCart

  // Find section and preset
  const foundSection = presetSections.find(
    s => s.title.toLowerCase().replace(/[^a-z]+/g, '-') === section
  );
  const foundPreset = foundSection?.presets.find(
    p => p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === preset
  );

  // Mock product details and reviews (customize as needed)
  const productDetails = {
    material: "Cotton Blend",
    brand: "BEATEN",
    collection: "Sample Collection",
    inStock: true,
  };

  // Initial dummy reviews
  const initialReviews = [
    {
      name: "John Doe",
      date: "March 15, 2024",
      rating: 5,
      content: "Excellent quality and perfect fit. The material is premium and the stitching is impeccable. Highly recommended!"
    },
    {
      name: "Jane Smith",
      date: "March 10, 2024",
      rating: 4,
      content: "Great product, very comfortable. The only reason for 4 stars is that the color is slightly different from the picture."
    },
    {
      name: "Mike Johnson",
      date: "March 5, 2024",
      rating: 5,
      content: "Absolutely love this product! The quality is outstanding and it exceeded my expectations."
    }
  ];

  // Reviews state (local only)
  const [reviews, setReviews] = useState(initialReviews);
  // Review form state
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 0,
    content: "",
  });

  function handleAddToCart() {
    if (!foundPreset || !foundSection) return;
    addToCart({
      id: foundPreset.id || `${foundSection.title}-${foundPreset.name}`,
      name: foundPreset.name,
      image: foundPreset.image,
      price: typeof foundPreset.price === "string"
        ? parseFloat(foundPreset.price.replace(/[^0-9.]/g, ""))
        : foundPreset.price,
      section: foundSection.title,
    });
    navigate("/cart");
  }

  if (!foundPreset || !foundSection) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <div>
          <h2 className="text-2xl font-bold mb-4">Preset not found</h2>
          <Link to="/presets" className="underline text-blue-400">Go back</Link>
        </div>
      </div>
    );
  }

  // Calculate average rating and review counts
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";
  const reviewCount = reviews.length;

  // Handle review form submission
  function handleReviewSubmit(e) {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.rating || !reviewForm.content) return;
    setReviews([
      {
        name: reviewForm.name,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        rating: reviewForm.rating,
        content: reviewForm.content,
      },
      ...reviews,
    ]);
    setReviewForm({ name: "", rating: 0, content: "" });
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-24 flex flex-col items-center pt-10">
      <div className="max-w-4xl w-full bg-gray-900 shadow-lg overflow-hidden">
        {/* Side-by-side section */}
        <div className="flex flex-col md:flex-row">
          {/* Product Image - left */}
          <div className="md:w-1/2 w-full flex items-center justify-center p-6">
            {/* Remove all gap between border and image by using object-cover */}
            <div className="w-[320px] h-[520px] bg-black flex items-center justify-center border-2 border-white">
              <img
                src={foundPreset.image}
                alt={foundPreset.name}
                className="w-full h-full object-cover m-0 p-0 block"
                style={{ display: "block" }}
              />
            </div>
          </div>
          {/* Product Details - right */}
          <div className="md:w-1/2 w-full p-6 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-1">{foundPreset.name}</h1>
            <div className="text-gray-400 text-sm mb-2">{foundSection.title}</div>
            {/* Price and reviews */}
            <div className="flex items-center mb-2">
              <div className="text-yellow-400 font-bold text-xl mr-3">{foundPreset.price}</div>
              <div className="flex items-center gap-2">
                <Stars rating={Math.round(averageRating)} />
                <span className="text-gray-300 text-sm ml-1">
                  {averageRating} ({reviewCount} reviews)
                </span>
              </div>
            </div>
            {/* Product Details */}
            <div className="mb-4 grid grid-cols-2 gap-2 text-sm text-gray-300">
              <div>Material: <span className="text-white">{productDetails.material}</span></div>
              <div>Brand: <span className="text-white">{productDetails.brand}</span></div>
              <div>Collection: <span className="text-white">{productDetails.collection}</span></div>
              <div>
                {productDetails.inStock ? (
                  <span className="text-green-400 font-semibold">In Stock</span>
                ) : (
                  <span className="text-red-400 font-semibold">Out of Stock</span>
                )}
              </div>
            </div>
            {/* Buttons */}
            <div className="flex gap-4 mt-2">
              <Link
                to="/presets"
                className="inline-block bg-white text-black px-4 py-2 shadow font-bold transition"
              >
                Back to Presets
              </Link>
              <button
                onClick={handleAddToCart}
                className="inline-block bg-white text-black px-4 py-2 shadow font-bold  transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        {/* Description and reviews below image/details */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-2">Description</h2>
            <p className="text-gray-300 text-base">
              This is a sample product description. It should provide extensive details about the product, covering its features, materials, and any other relevant information a customer might want to know before making a purchase. It is designed to give a comprehensive overview. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          {/* Customer Reviews */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-2">Customer Reviews</h2>
            <div className="mb-2 text-yellow-400 font-bold text-xl">{averageRating}</div>
            <div className="mb-2 text-gray-300 text-sm">Based on {reviewCount} reviews</div>
            <div className="mb-6 grid grid-cols-5 gap-2">
              <div>5 Stars</div>
              <div className="col-span-4">
                {reviews.filter(r => r.rating === 5).length}
              </div>
              <div>4 Stars</div>
              <div className="col-span-4">
                {reviews.filter(r => r.rating === 4).length}
              </div>
              <div>3 Stars</div>
              <div className="col-span-4">
                {reviews.filter(r => r.rating === 3).length}
              </div>
              <div>2 Stars</div>
              <div className="col-span-4">
                {reviews.filter(r => r.rating === 2).length}
              </div>
              <div>1 Star</div>
              <div className="col-span-4">
                {reviews.filter(r => r.rating === 1).length}
              </div>
            </div>
            {/* Write a Review */}
            <div className="mb-6">
              <h3 className="text-base font-bold mb-2">Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-gray-800 text-white rounded px-2 py-1"
                  value={reviewForm.name}
                  onChange={e => setReviewForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
                <div>
                  <span className="mr-2">Your Rating</span>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      className={`text-xl px-1 ${reviewForm.rating >= star ? "text-yellow-400" : "text-gray-500"}`}
                      onClick={() => setReviewForm(f => ({ ...f, rating: star }))}
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Share your experience with this product..."
                  className="bg-gray-800 text-white rounded px-2 py-1 min-h-[60px]"
                  value={reviewForm.content}
                  onChange={e => setReviewForm(f => ({ ...f, content: e.target.value }))}
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-black rounded px-4 py-1 font-bold hover:bg-white transition self-start"
                >
                  Submit Review
                </button>
              </form>
            </div>
            {/* Reviews List */}
            <div className="mt-4">
              {reviews.map((r, idx) => (
                <div key={r.name + r.date + idx} className="mb-6 border-b border-gray-800 pb-4">
                  <div className="font-bold">{r.name}</div>
                  <div className="text-gray-400 text-xs mb-1">{r.date}</div>
                  <Stars rating={r.rating} />
                  <div className="mt-2">{r.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
