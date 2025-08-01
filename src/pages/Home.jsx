import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "/assets/hero1.png",
  "/assets/hero2.png",
  "/assets/hero3.png",
];

const services = [
  {
    title: "Cinematic",
    icon: "🎞️",
    image: "/assets/gd6.jpg",
    description: (
      <>
        Inspired by Hollywood films.<br />
        Deep contrast, desaturated shadows, often with letterbox (black bars).<br />
        Creates mood and emotion.<br />
        <span className="font-semibold">Ideal for:</span> short films, music videos, storytelling content.
      </>
    ),
  },
  {
    title: "Teal & Orange",
    icon: "🌊",
    image: "/assets/gd9.jpg",
    description: (
      <>
        One of the most popular stylized looks.<br />
        Skin tones are warm (orange) while shadows are cool (teal).<br />
        High contrast, eye-catching.<br />
        <span className="font-semibold">Ideal for:</span> travel vlogs, action films, YouTube content.
      </>
    ),
  },
  {
    title: "Vintage / Retro",
    icon: "📽️",
    image: "/assets/gd7.jpg",
    description: (
      <>
        Faded blacks, lower contrast, grainy texture.<br />
        Mimics film stock from 70s/80s.<br />
        Sepia tones, light leaks sometimes used.<br />
        <span className="font-semibold">Ideal for:</span> lifestyle shoots, nostalgic videos, fashion.
      </>
    ),
  },
  {
    title: "Dark & Moody",
    icon: "🌫️",
    image: "/assets/gd8.jpg",
    description: (
      <>
        Desaturated, deep blacks, cool shadows.<br />
        Emphasizes shadows and emotion.<br />
        Often used for storytelling or artistic shots.<br />
        <span className="font-semibold">Ideal for:</span> portrait photography, fine art, music videos.
      </>
    ),
  },
  {
    title: "Film Look / Analog",
    icon: "🎥",
    image: "/assets/gd1.jpg",
    description: (
      <>
        Emulates the look of analog film (Kodak, Fuji, etc.).<br />
        Slight grain, rich colors, balanced highlights.<br />
        Often warm and organic.<br />
        <span className="font-semibold">Ideal for:</span> cinema, weddings, documentaries.
      </>
    ),
  },
];

export default function Home() {
  // Hero background slider
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  // Auto-slide effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleRadioChange = (idx) => {
    clearInterval(timerRef.current);
    setCurrent(idx);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
  };

  const handlePrev = () => {
    clearInterval(timerRef.current);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
  };

  const handleNext = () => {
    clearInterval(timerRef.current);
    setCurrent((prev) => (prev + 1) % images.length);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
  };

  // THIS is the function that navigates to /grading:
  const handleUploadClick = () => {
    navigate("/grading");
  };

  return (
    <div className="min-h-screen w-full bg-black pt-20">
      {/* HERO SECTION */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden rounded-xl">
        {/* Background slideshow */}
        <div className="absolute inset-0 w-full h-full">
          {images.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={`Hero ${idx + 1}`}
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
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-40 rounded-full p-2 hover:bg-opacity-70 transition"
        >
          <svg width="24" height="24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        {/* Right Arrow */}
        <button
          aria-label="Next"
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-40 rounded-full p-2 hover:bg-opacity-70 transition"
        >
          <svg width="24" height="24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Pixelfable</h1>
          <p className="text-lg md:text-xl mb-8">
            Discover premium LUTs and color grading presets to elevate your photos and videos.
          </p>
          <a
            href="/presets"
            className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-200 transition"
          >
            Browse Presets
          </a>
          {/* SMALL RADIO BUTTONS FOR SLIDES */}
          <form className="mt-8 flex justify-center gap-4">
            {images.map((_, idx) => (
              <label key={idx} className="flex flex-col items-center cursor-pointer">
                <input
                  type="radio"
                  name="hero-slider"
                  checked={current === idx}
                  onChange={() => handleRadioChange(idx)}
                  className="peer appearance-none w-3 h-3 rounded-full border-2 border-white checked:bg-white checked:border-white transition"
                />
              </label>
            ))}
          </form>
        </div>
      </section>

      {/* GRADING SECTION */}
      <section className="w-full mt-16 flex flex-col md:flex-row items-center justify-center bg-black rounded-xl p-8 shadow-lg">
        {/* Grading Sample Image (vertical) */}
        <div className="w-full md:w-1/3 flex justify-center mb-8 md:mb-0 md:mr-12">
          <img
            src="/assets/gd6.jpg"
            alt="Gallery Submission Example"
            className="rounded-lg shadow-lg w-auto h-[400px] object-cover border border-gray-700"
            style={{ maxWidth: "300px" }}
          />
        </div>
        {/* Description */}
        <div className="w-full md:w-2/3 text-white flex flex-col items-start">
          <h2 className="text-4xl font-extrabold mb-6 w-full text-left">
            Submit Your Best Graded Shot!
          </h2>
          <p className="mb-8 text-lg text-gray-200 w-full">
            Proud of your color grading skills? Upload your favorite graded image and get a chance to be featured on our site! If your work stands out, we’ll showcase it in our gallery to inspire fellow creators.
          </p>
          <button
            className="bg-white text-black font-bold px-8 py-3 rounded-full shadow hover:bg-gray-200 transition"
            onClick={handleUploadClick}  // <-- THIS CONNECTS TO GRADING PAGE!
          >
            Upload Your Graded Image
          </button>
        </div>
      </section>

      {/* ABOUT PIXELFABLE SECTION */}
      <section className="w-full mt-16 flex flex-col md:flex-row items-center justify-center bg-black rounded-xl p-8 shadow-lg">
        {/* About Description (left) */}
        <div className="w-full md:w-2/3 text-white flex flex-col items-start">
          <h2 className="text-4xl font-extrabold mb-6 w-full text-left">
            About Pixelfable
          </h2>
          <p className="mb-8 text-lg text-gray-200 w-full">
            Pixelfable is dedicated to empowering creators, photographers, and filmmakers with premium color grading tools and LUTs. 
            Our mission is to help you bring your visual stories to life with vibrant, professional-grade color enhancements. 
            With a passion for creative expression and technical excellence, Pixelfable supports artists at every level—whether you’re a seasoned professional or just starting your creative journey.
          </p>
        </div>
        {/* About Image (right) */}
        <div className="w-full md:w-1/3 flex justify-center mb-8 md:mb-0 md:ml-12">
          <img
            src="/assets/hero4.png"
            alt="About Pixelfable"
            className="rounded-lg shadow-lg w-auto h-[300px] object-cover border border-gray-700"
            style={{ maxWidth: "300px" }}
          />
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="w-full mt-16 px-4 md:px-0 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-white mb-12 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className="flex flex-col rounded-xl bg-gray-900 bg-opacity-80 shadow-lg overflow-hidden max-w-xs mx-auto"
              >
                <div className="w-full h-[160px] md:h-[180px] flex-shrink-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                    <span>{service.icon}</span> {service.title}
                  </h3>
                  <div className="text-gray-200 text-sm mb-1 leading-relaxed">
                    {service.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
