import React from "react";
import { Link } from "react-router-dom";
import HeartBackground from "../components/HeartBackground";

const QuotePage = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative">
      <HeartBackground />

      <div className="px-6 sm:p-40 h-[85vh] z-10 w-full flex items-center justify-center">
        <div className="max-w-5xl">
          <div className="text-xl sm:text-4xl italic text-pink-600 leading-relaxed">
            "I will love you forever; whatever happens. Till I die and after I
            die, and when I find my way out of the land of the dead, I'll drift
            about forever, all my atoms, till I find you again… I'll be looking
            for you, every moment, every single moment. And when we do find each
            other again, we'll cling together so tight that nothing and no one
            will ever tear us apart. Every atom of you and every atom of me...
            we'll live in birds and flowers and dragonflies and pine trees and
            in clouds and in those little specks of light you see floating in
            sunbeams... and when they use our atoms to make new lives, they
            won't just be able to take one, they'll have to take two, one of you
            and one of me."
          </div>

          <div className="mt-6 text-xl sm:text-4xl font-bold text-end text-pink-700">
            -Philip Pullman
          </div>
        </div>
      </div>

      {/* Mobile: stacked full-width buttons; Desktop keep original */}
      <div className="w-full px-6 sm:px-0 flex flex-col sm:flex-row justify-center sm:justify-around items-center gap-4 h-[15vh] z-10">
        <Link to="/" className="w-full sm:w-auto">
          <button className="w-full sm:w-32 bg-pink-400 hover:bg-pink-500 h-12 sm:h-15 rounded-2xl border border-black text-lg sm:text-2xl text-white">
            Prev
          </button>
        </Link>
        <Link to="/journey" className="w-full sm:w-auto">
          <button className="w-full sm:w-32 bg-pink-400 hover:bg-pink-500 h-12 sm:h-15 rounded-2xl border border-black text-lg sm:text-2xl text-white">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuotePage;
