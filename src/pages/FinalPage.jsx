import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import HeartBackground from "../components/HeartBackground";

const STORAGE_KEY = "selected_date_place";

const FinalPage = () => {
  const [chosen, setChosen] = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setChosen(JSON.parse(raw));
      } catch {}
    }

    // Confetti on mount, longer burst
    const duration = 6500;
    const interval = setInterval(() => {
      confetti({
        particleCount: 24,
        spread: 90,
        startVelocity: 40,
        origin: { x: Math.random(), y: Math.random() * 0.2 + 0.05 },
      });
    }, 250);

    confetti({ particleCount: 160, spread: 160, origin: { y: 0.35 } });

    const stop = setTimeout(() => clearInterval(interval), duration + 100);
    return () => {
      clearInterval(interval);
      clearTimeout(stop);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative">
      <HeartBackground />

      <div className="h-[15vh] flex items-center justify-center text-5xl font-extrabold text-pink-500 z-10">
        Final Plan
      </div>

      <div className="p-40 h-[70vh] flex items-center justify-center z-10">
        <div className="bg-white p-10 rounded-3xl shadow-lg border border-pink-100 text-center max-w-3xl">
          <p className="text-3xl text-pink-500 font-extrabold">
            See you on 14th Feb 💖
          </p>

          {chosen ? (
            <>
              <p className="mt-6 text-xl text-pink-400">At</p>
              <p className="text-2xl text-pink-500 font-semibold">
                {chosen.text}
              </p>
            </>
          ) : (
            <p className="mt-6 text-xl text-pink-300">
              No place was selected. If this was a mistake, go back and choose one.
            </p>
          )}

          <div className="mt-8 flex justify-center gap-6">
            <Link to="/">
              <button className="bg-pink-400 hover:bg-pink-500 rounded-2xl px-6 py-3 text-2xl text-white border border-black">
                Ok
              </button>
            </Link>
            <Link to="/place">
              <button className="bg-white hover:bg-pink-50 rounded-2xl px-6 py-3 text-2xl text-pink-500 border-2 border-pink-300">
                Change
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full h-[15vh]" />
    </div>
  );
};

export default FinalPage;
