import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import HeartBackground from "../components/HeartBackground";

const GiftOnePage = () => {
  useEffect(() => {
    const duration = 6000;
    const interval = setInterval(() => {
      confetti({
        particleCount: 18,
        spread: 70,
        startVelocity: 35,
        origin: { x: Math.random(), y: Math.random() * 0.2 + 0.05 },
      });
    }, 300);

    confetti({ particleCount: 100, spread: 120, origin: { y: 0.3 } });

    const stop = setTimeout(() => clearInterval(interval), duration + 100);
    return () => {
      clearInterval(interval);
      clearTimeout(stop);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative">
      <HeartBackground />

      <div className="h-[12vh] sm:h-[15vh] flex items-center justify-center z-10">
        <div className="text-3xl sm:text-5xl font-extrabold text-pink-500">
          Gift1
        </div>
      </div>

      <div className="p-6 sm:p-40 h-[65vh] sm:h-[70vh] flex items-center justify-center z-10 w-full">
        <div
          className="w-full max-w-lg sm:max-w-3xl bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-lg border border-pink-100"
          style={{
            lineHeight: 1.6,
            fontFamily:
              "'Brush Script MT', 'Segoe Script', 'Lucida Handwriting', cursive",
          }}
        >
          <p className="text-2xl sm:text-4xl text-pink-400">My Cupcake,</p>

          <p className="mt-4 sm:mt-6 text-base sm:text-2xl text-pink-500">
            From the first time our paths crossed I felt a gentle certainty.
            Your laugh became my favorite song, your hand my surest place.
            Every ordinary day with you turns soft and bright.
          </p>

          <p className="mt-4 sm:mt-6 text-base sm:text-2xl text-pink-500">
            Thank you for loving me exactly as I am. I choose you, again and
            again, for all the small and large moments.
          </p>

          <p className="mt-6 sm:mt-8 text-base sm:text-2xl text-pink-400">
            Always yours,
          </p>
          <p className="mt-2 text-base sm:text-2xl text-pink-400 font-semibold">
            - Sunshine
          </p>
        </div>
      </div>

      {/* Mobile: stacked full-width buttons; Desktop keep original */}
      <div className="w-full px-6 sm:px-0 flex flex-col sm:flex-row justify-center sm:justify-around items-center gap-4 h-[15vh] z-10">
        <Link to="/journey" className="w-full sm:w-auto">
          <button className="w-full sm:w-32 bg-pink-400 hover:bg-pink-500 h-12 sm:h-15 rounded-2xl border border-black text-lg sm:text-2xl text-white">
            Prev
          </button>
        </Link>
        <Link to="/gift2" className="w-full sm:w-auto">
          <button className="w-full sm:w-32 bg-pink-400 hover:bg-pink-500 h-12 sm:h-15 rounded-2xl border border-black text-lg sm:text-2xl text-white">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GiftOnePage;
