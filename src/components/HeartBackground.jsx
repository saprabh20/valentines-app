import React from "react";

/**
 * HeartBackground
 * Simple, lightweight floating hearts background.
 * Renders absolutely-positioned heart elements with CSS animations.
 *
 * Usage: include <HeartBackground /> as the first child inside the page wrapper
 * so it sits behind the page content.
 */
const HeartBackground = () => {
  return (
    <>
      <style>{`
        .heart-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
          background: linear-gradient(135deg,#fff0f6,#ffe6f2);
        }
        .heart {
          position: absolute;
          font-size: 28px;
          opacity: 0.9;
          transform: translateY(0) scale(1);
          animation-name: floatUp;
          animation-timing-function: linear;
          will-change: transform, opacity;
          text-shadow: 0 1px 0 rgba(255,255,255,0.6);
        }
        @keyframes floatUp {
          0% { transform: translateY(20vh) scale(0.9) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translateY(-10vh) scale(1.05) rotate(20deg); opacity: 1; }
          100% { transform: translateY(-110vh) scale(0.9) rotate(60deg); opacity: 0; }
        }
        /* small responsive tweak */
        @media (max-width: 640px) {
          .heart { font-size: 22px; }
        }
      `}</style>

      <div className="heart-bg" aria-hidden>
        {/* Hardcoded hearts with varied left, animation-duration and delay */}
        <div
          className="heart"
          style={{ left: "5%", animationDuration: "9s", animationDelay: "0s" }}
        >
          ❤️
        </div>
        <div
          className="heart"
          style={{ left: "22%", animationDuration: "11s", animationDelay: "1s" }}
        >
          💖
        </div>
        <div
          className="heart"
          style={{ left: "38%", animationDuration: "8s", animationDelay: "0.5s" }}
        >
          💕
        </div>
        <div
          className="heart"
          style={{ left: "55%", animationDuration: "10s", animationDelay: "0.8s" }}
        >
          ❤
        </div>
        <div
          className="heart"
          style={{ left: "72%", animationDuration: "12s", animationDelay: "1.5s" }}
        >
          💓
        </div>
        <div
          className="heart"
          style={{ left: "88%", animationDuration: "9.5s", animationDelay: "0.2s" }}
        >
          💗
        </div>
      </div>
    </>
  );
};

export default HeartBackground;
