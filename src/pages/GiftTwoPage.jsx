import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import HeartBackground from "../components/HeartBackground";

const GiftTwoPage = () => {
  useEffect(() => {
    const duration = 6000;
    const interval = setInterval(() => {
      confetti({
        particleCount: 20,
        spread: 72,
        startVelocity: 38,
        origin: { x: Math.random(), y: Math.random() * 0.2 + 0.05 },
      });
    }, 300);

    confetti({ particleCount: 80, spread: 130, origin: { y: 0.3 } });

    const stop = setTimeout(() => clearInterval(interval), duration + 100);
    return () => {
      clearInterval(interval);
      clearTimeout(stop);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative">
      <HeartBackground />

      <div className="w-full flex flex-col items-center justify-center z-10 px-4 pt-6 sm:pt-10">
        <div className="text-3xl sm:text-5xl font-extrabold text-pink-500">
          Gift2
        </div>
        <div className="mt-2 text-base sm:text-2xl italic text-pink-400">
          My Favorite Memory of Us!
        </div>
      </div>

      {/* VIDEO SECTION */}
      <div className="flex-1 w-full flex items-center justify-center z-10 px-4 pb-6 sm:pb-10">
        <video
          className="
            w-full
            max-w-[360px]
            sm:max-w-[420px]
            h-auto
            max-h-[68vh]
            rounded-3xl
            border-4 border-pink-100
            shadow-xl
            bg-black
            object-contain
          "
          src="/gift2.mp4"
          controls
          playsInline
        />
      </div>

      {/* Mobile: stacked full-width buttons; Desktop (sm+) keep original side-by-side spacing */}
      <div className="w-full px-6 sm:px-0 flex flex-col sm:flex-row justify-center sm:justify-around items-center gap-4 h-[14vh] sm:h-[15vh] z-10 pb-6">
        <Link to="/gift1" className="w-full sm:w-auto">
          <button
            className="w-full sm:w-36 bg-pink-400 hover:bg-pink-500 h-12 sm:h-15 rounded-2xl border border-black text-lg sm:text-2xl text-white"
            aria-label="Previous"
          >
            Prev
          </button>
        </Link>

        <Link to="/gift3" className="w-full sm:w-auto">
          <button
            className="w-full sm:w-36 bg-pink-400 hover:bg-pink-500 h-12 sm:h-15 rounded-2xl border border-black text-lg sm:text-2xl text-white"
            aria-label="Next"
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GiftTwoPage;
