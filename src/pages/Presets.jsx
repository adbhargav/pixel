import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { presetSections } from "../data/presetsData";

// HERO SECTION IMAGES
const heroImages = [
  "/assets/hero1.png",
  "/assets/hero2.png",
  "/assets/hero3.png",
];

const SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
];

function sortPresets(presets, sortBy) {
  const presetsCopy = [...presets];
  if (sortBy === "name-asc") {
    presetsCopy.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "name-desc") {
    presetsCopy.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === "price-asc") {
    presetsCopy.sort((a, b) => {
      const pa = parseFloat(a.price.replace(/[^\d.]/g, ""));
      const pb = parseFloat(b.price.replace(/[^\d.]/g, ""));
      return pa - pb;
    });
  } else if (sortBy === "price-desc") {
    presetsCopy.sort((a, b) => {
      const pa = parseFloat(a.price.replace(/[^\d.]/g, ""));
      const pb = parseFloat(b.price.replace(/[^\d.]/g, ""));
      return pb - pa;
    });
  }
  return presetsCopy;
}

export default function Presets() {
  // HERO SLIDER LOGIC
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  // Sort state
  const [sortBy, setSortBy] = useState("name-asc");

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleRadioChange = (idx) => {
    clearInterval(timerRef.current);
    setCurrent(idx);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 2000);
  };

  const handlePrev = () => {
    clearInterval(timerRef.current);
    setCurrent((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 2000);
  };

  const handleNext = () => {
    clearInterval(timerRef.current);
    setCurrent((prev) => (prev + 1) % heroImages.length);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 2000);
  };

  // Helper for route
  const getPresetLink = (section, preset) => {
    return `/presets/${section.title.toLowerCase().replace(/[^a-z]+/g, '-')}/${preset.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-24 pt-20">
      {/* HERO SECTION */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background slideshow */}
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={`Presets Hero ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                idx === current ? "opacity-100" : "opacity-0"
              }`}
              style={{ zIndex: idx === current ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        {/* Left Arrow */}
        <button
          aria-label="Previous"
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-40 p-2 hover:bg-opacity-70 transition"
        >
          <svg width="24" height="24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        {/* Right Arrow */}
        <button
          aria-label="Next"
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-40 p-2 hover:bg-opacity-70 transition"
        >
          <svg width="24" height="24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white w-full">
          <h1 className="text-5xl font-extrabold mb-4">Presets & LUTs</h1>
          <p className="text-lg text-gray-300 mb-8 px-4">
            Explore our premium color grading presets and LUTs, designed for every creative style. Instantly elevate your photos and videos with professional-grade looks.
          </p>
          {/* SMALL RADIO BUTTONS FOR SLIDES */}
          <form className="mt-8 flex justify-center gap-4">
            {heroImages.map((_, idx) => (
              <label key={idx} className="flex flex-col items-center cursor-pointer">
                <input
                  type="radio"
                  name="hero-slider"
                  checked={current === idx}
                  onChange={() => handleRadioChange(idx)}
                  className="peer appearance-none w-3 h-3 rounded-full border-2 border-white checked:bg-white checked:border-white transition"
                />
                <span className="sr-only">{`Slide ${idx + 1}`}</span>
              </label>
            ))}
          </form>
        </div>
      </section>

      {/* SORT BUTTON */}
      <div className="max-w-6xl mx-auto px-4 mt-8 flex justify-end items-center">
        <label htmlFor="sortPresets" className="mr-2 font-semibold text-gray-200">
          Sort by:
        </label>
        <select
          id="sortPresets"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-700 font-semibold"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Sectioned Preset Categories */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        {presetSections.map((section, idx) => (
          <div key={section.title} className="mb-16">
            <h2 className="text-3xl font-bold mb-2">{section.title}</h2>
            <p className="text-gray-400 mb-6">{section.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {sortPresets(section.presets, sortBy).map((preset, pidx) => {
                const presetLink = getPresetLink(section, preset);
                return (
                  <div
                    key={preset.name}
                    className="bg-gray-900 bg-opacity-80 shadow-lg overflow-hidden flex flex-col transition hover:scale-105 duration-300 cursor-pointer"
                    onClick={() => navigate(presetLink)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${preset.name}`}
                  >
                    {/* Full image, no border-radius, no cropping */}
                    <div className="w-full aspect-[4/3] bg-black flex items-center justify-center">
                      <img
                        src={preset.image}
                        alt={preset.name}
                        className="w-full h-full object-contain"
                        style={{ display: "block" }}
                      />
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <h3 className="text-base font-bold mb-1">{preset.name}</h3>
                      <p className="text-gray-300 text-xs mb-1 flex-1">{preset.description}</p>
                      <span className="text-white font-bold text-sm mt-1">{preset.price}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
