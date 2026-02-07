import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import HeartBackground from "../components/HeartBackground";
import { QRCodeCanvas } from "qrcode.react";

const SPOTIFY_URL =
  "https://open.spotify.com/track/56VWAUhLoJNmqJJKSQwFy6?si=716e7b32a8954d46";

const GiftThreePage = () => {
  // responsive QR size (mobile smaller). desktop layout is preserved via sm: classes.
  const [qrSize, setQrSize] = useState(() =>
    typeof window === "undefined" ? 220 : window.innerWidth < 640 ? 160 : 220
  );

  useEffect(() => {
    const onResize = () => {
      setQrSize(window.innerWidth < 640 ? 160 : 220);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const duration = 6000;
    const interval = setInterval(() => {
      confetti({
        particleCount: 22,
        spread: 88,
        startVelocity: 42,
        origin: { x: Math.random(), y: Math.random() * 0.2 + 0.05 },
      });
    }, 280);

    confetti({ particleCount: 120, spread: 150, origin: { y: 0.35 } });

    const stop = setTimeout(() => clearInterval(interval), duration + 100);
    return () => {
      clearInterval(interval);
      clearTimeout(stop);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative">
      <HeartBackground />

      {/* Header — preserve desktop sizes at sm+ */}
      <div className="w-full flex items-center justify-center z-10">
        <div className="px-4 sm:px-0 h-[12vh] sm:h-[15vh] flex items-center justify-center">
          <div className="text-2xl sm:text-5xl font-extrabold text-pink-500 text-center">
            Gift3
          </div>
        </div>
      </div>

      <div className="w-full z-10">
        <div className="px-4 sm:px-40 h-[auto] sm:h-[70vh] w-full flex items-center justify-center">
          <div className="w-full max-w-full sm:max-w-4xl flex flex-col sm:flex-col items-center justify-center gap-6 sm:gap-8 py-6 sm:py-0">
            {/* QR block */}
            <div className="bg-white rounded-3xl border border-pink-100 shadow-lg p-4 sm:p-6 flex flex-col items-center">
              <p className="text-lg sm:text-xl text-pink-500 font-semibold mb-3 text-center">
                Scan for our song 🎶
              </p>

              <div className="p-2 bg-white rounded-2xl border border-pink-200">
                <QRCodeCanvas value={SPOTIFY_URL} size={qrSize} includeMargin />
              </div>

              <a
                href={SPOTIFY_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 text-sm sm:text-base text-pink-500 hover:text-pink-600 underline"
                aria-label="Open Spotify link in new tab"
              >
                Open in Spotify
              </a>
            </div>

            {/* Text block */}
            <div className="text-center sm:text-left max-w-xl">
              <p className="text-lg sm:text-4xl text-pink-500 font-extrabold leading-snug">
                Will you be my forever?
              </p>

              <p className="mt-3 sm:mt-6 text-sm sm:text-2xl text-pink-400 leading-relaxed">
                I want to keep making memories with you, laughing at the small
                things, holding your hand through every high and low, and most
                importantly, listening to this song while we drive together,
                just us. 🚘
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked full-width buttons; Desktop keep original */}
      <div className="w-full px-6 sm:px-0 flex flex-col sm:flex-row justify-center sm:justify-around items-center gap-4 h-[15vh] z-10">
        <Link to="/gift2" className="w-full sm:w-auto">
          <button
            className="w-full sm:w-36 bg-pink-400 hover:bg-pink-500 h-12 sm:h-15 rounded-2xl border border-black text-lg sm:text-2xl text-white"
            aria-label="Previous"
          >
            Prev
          </button>
        </Link>

        <Link to="/place" className="w-full sm:w-auto">
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

export default GiftThreePage;
