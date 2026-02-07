import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeartBackground from "../components/HeartBackground";
import confetti from "canvas-confetti";

const HomePage = () => {
  const navigate = useNavigate();
  const [ques, setQues] = useState(0);

  const questions = useMemo(
    () => [
      "Will you be my valentine? 💝",
      "Are you sure? 🤨",
      "Please be my valentine! 🙏🏻",
      "Don't do this to me! 🥺",
      "There are surprises if you say yes! 😏",
      "So, I guess you don't wanna be my valentine. ☹️",
    ],
    []
  );

  const maxIndex = questions.length - 1;

  const funnyFinalNo = () => {
    confetti({ particleCount: 220, spread: 180, origin: { y: 0.35 } });

    document.body.classList.add("shake-page");
    setTimeout(() => document.body.classList.remove("shake-page"), 600);

    alert("Oops. That 'No' button is out of service 😜\nTry again, cupcake!");

    setQues(0);
    navigate("/");
    window.scrollTo(0, 0);
  };

  const handleNo = () => {
    if (ques >= maxIndex) {
      funnyFinalNo();
      return;
    }
    setQues((q) => q + 1);
  };

  const currentImgIndex = (ques % 5) + 1;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative">
      <style>{`
        .shake-page { animation: shake 0.6s; }
        @keyframes shake {
          0% { transform: translateX(0); }
          10% { transform: translateX(-10px); }
          20% { transform: translateX(10px); }
          30% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          50% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          70% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
          90% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <HeartBackground />

      <div className="h-[10vh] sm:h-[15%] z-10" />

      <div className="h-[42vh] sm:h-[50vh] flex justify-center z-10 w-full px-4 sm:px-6">
        <img
          className="rounded-4xl object-contain max-h-full w-full max-w-[520px] border-4 border-pink-100 shadow-md bg-white"
          src={`/src/assets/img${currentImgIndex}.jpg`}
          alt="Cute"
        />
      </div>

      <div className="text-center h-[28vh] sm:h-[20vh] flex justify-center items-center flex-col z-10 px-4 sm:px-6">
        <div className="text-3xl sm:text-6xl font-bold text-pink-600 hover:underline">
          {ques === 0 ? "Hello, Cupcake!" : null}
        </div>
        <div className="text-2xl sm:text-6xl font-bold text-pink-600 hover:underline leading-snug sm:leading-none mt-2">
          {questions[ques]}
        </div>
      </div>

      {/* Mobile: stacked full-width buttons; Desktop: preserve original spacing */}
      <div className="w-full px-6 sm:px-0 flex flex-col sm:flex-row justify-center sm:justify-evenly items-center gap-4 h-[20vh] sm:h-[15vh] z-10 pb-6">
        <Link to="/quote" className="w-full sm:w-auto">
          <button className="w-full sm:w-32 bg-pink-400 hover:bg-pink-500 h-12 sm:h-15 rounded-2xl border border-black text-lg sm:text-2xl text-white">
            Yes
          </button>
        </Link>

        <button
          className="w-full sm:w-32 bg-pink-400 hover:bg-pink-500 h-12 sm:h-15 rounded-2xl border border-black text-lg sm:text-2xl text-white"
          onClick={handleNo}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default HomePage;
