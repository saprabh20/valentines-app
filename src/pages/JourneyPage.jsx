import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { supabase } from "../supabaseClient";
import HeartBackground from "../components/HeartBackground";

import "swiper/css";
import "swiper/css/navigation";

const BUCKET = "images";
const SIGNED_EXP_SECONDS = 60 * 60; // 1 hour
const PREFETCH_RADIUS = 6;

const isMediaFile = (name) => /\.(jpe?g|png|webp)$/i.test(name);

const extractLeadingNumber = (name) => {
  const match = name.match(/^(\d+)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const preloadImage = (url) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = url;
  });

const JourneyPage = () => {
  const [files, setFiles] = useState([]);
  const [signedUrlByName, setSignedUrlByName] = useState({});
  const [loading, setLoading] = useState(true);

  const signingInFlight = useRef(new Set());

  const cacheKey = (name) => `sb_signed_${BUCKET}_${name}`;

  const getCachedSigned = (name) => {
    try {
      const raw = sessionStorage.getItem(cacheKey(name));
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed?.url || !parsed?.exp) return null;

      if (Date.now() > parsed.exp) {
        sessionStorage.removeItem(cacheKey(name));
        return null;
      }
      return parsed.url;
    } catch {
      return null;
    }
  };

  const setCachedSigned = (name, url, expiresInSec) => {
    try {
      const exp = Date.now() + expiresInSec * 1000 - 10_000;
      sessionStorage.setItem(cacheKey(name), JSON.stringify({ url, exp }));
    } catch {
      // ignore
    }
  };

  const clearCachedSigned = (name) => {
    try {
      sessionStorage.removeItem(cacheKey(name));
    } catch {
      // ignore
    }
    setSignedUrlByName((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const ensureSignedForNames = async (names) => {
    const toFetch = [];
    const currentMap = signedUrlByName;

    for (const name of names) {
      if (!name) continue;

      if (currentMap[name]) continue;

      const cached = getCachedSigned(name);
      if (cached) {
        setSignedUrlByName((prev) => ({ ...prev, [name]: cached }));
        continue;
      }

      if (signingInFlight.current.has(name)) continue;
      signingInFlight.current.add(name);
      toFetch.push(name);
    }

    if (toFetch.length === 0) return;

    let signedPairs = [];
    try {
      const api = supabase.storage.from(BUCKET);

      if (typeof api.createSignedUrls === "function") {
        const { data, error } = await api.createSignedUrls(
          toFetch,
          SIGNED_EXP_SECONDS
        );
        if (error) throw error;

        signedPairs = (data || [])
          .map((row) => ({ name: row.path, url: row.signedUrl }))
          .filter((x) => x.name && x.url);
      } else {
        const results = await Promise.all(
          toFetch.map(async (name) => {
            const { data, error } = await api.createSignedUrl(
              name,
              SIGNED_EXP_SECONDS
            );
            if (error) return null;
            return { name, url: data?.signedUrl };
          })
        );
        signedPairs = results.filter((x) => x?.name && x?.url);
      }
    } catch (e) {
      console.error("Signing error:", e);
    } finally {
      toFetch.forEach((n) => signingInFlight.current.delete(n));
    }

    if (signedPairs.length === 0) return;

    setSignedUrlByName((prev) => {
      const next = { ...prev };
      for (const { name, url } of signedPairs) {
        next[name] = url;
        setCachedSigned(name, url, SIGNED_EXP_SECONDS);
      }
      return next;
    });

    await Promise.all(signedPairs.map((p) => preloadImage(p.url)));
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const { data, error } = await supabase.storage.from(BUCKET).list("", {
        limit: 1000,
      });

      if (error) {
        console.error("List error:", error);
        setLoading(false);
        return;
      }

      const sortedFiles = (data || [])
        .filter((f) => isMediaFile(f.name))
        .sort((a, b) => {
          const na = extractLeadingNumber(a.name);
          const nb = extractLeadingNumber(b.name);
          if (na !== nb) return na - nb;
          return a.name.localeCompare(b.name);
        });

      setFiles(sortedFiles);
      setLoading(false);

      const initial = sortedFiles
        .slice(0, PREFETCH_RADIUS + 2)
        .map((f) => f.name);

      await ensureSignedForNames(initial);
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slides = useMemo(() => {
    return files.map((f, index) => {
      const url = signedUrlByName[f.name] || "";
      return {
        name: f.name,
        url,
        title: `Moment ${index + 1}`,
        desc: "A special memory ❤️",
      };
    });
  }, [files, signedUrlByName]);

  const handleSlideChange = async (swiper) => {
    const active = swiper?.activeIndex ?? 0;
    const start = Math.max(0, active - PREFETCH_RADIUS);
    const end = Math.min(files.length - 1, active + PREFETCH_RADIUS);

    const names = [];
    for (let i = start; i <= end; i++) names.push(files[i]?.name);

    await ensureSignedForNames(names);
  };

  const handleImgError = async (name) => {
    if (!name) return;
    clearCachedSigned(name);
    await ensureSignedForNames([name]);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-3xl text-pink-400 relative">
        <HeartBackground />
        <div className="z-10">Loading memories… 💖</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative">
      <HeartBackground />

      <div className="h-[15vh] flex flex-col items-center justify-center z-10 px-4">
        <div className="text-3xl sm:text-5xl font-extrabold text-pink-500 text-center">
          Our Journey!
        </div>
        <div className="text-base sm:text-2xl font-light italic text-pink-400 text-center mt-2 px-6">
          Hi, these are our memories from our first photo to our last photo
          together. I cry whenever I watch them till the end. 💖
        </div>
      </div>

      <div className="w-full h-[70vh] flex items-center justify-center z-10 px-3 sm:px-0">
        <div className="h-full w-full flex items-center justify-center">
          <Swiper
            className="h-[78%] sm:h-[70%] w-full sm:w-[80%] flex justify-center items-center"
            modules={[Navigation]}
            spaceBetween={14}
            slidesPerView={1}
            navigation
            speed={600}
            onSlideChange={handleSlideChange}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
          >
            {slides.map((img, index) => (
              <SwiperSlide key={img.name || index}>
                <div className="h-full w-full rounded-4xl overflow-hidden group">
                  <div
                    className="
                      w-full h-full bg-white rounded-4xl
                      border border-pink-200
                      transition-all duration-300 ease-out
                      hover:-translate-y-1 hover:shadow-2xl hover:border-pink-400
                      cursor-pointer
                      relative
                    "
                  >
                    {img.url ? (
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-contain rounded-4xl"
                        loading="lazy"
                        decoding="async"
                        onError={() => handleImgError(img.name)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-pink-300">
                        Loading image…
                      </div>
                    )}

                    <div
                      className="
                        absolute inset-0 rounded-4xl
                        bg-gradient-to-t from-pink-100/40 to-transparent
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300
                        pointer-events-none
                      "
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Mobile buttons uniform with your other pages */}
      <div className="w-full px-6 sm:px-0 flex flex-col sm:flex-row justify-center sm:justify-around items-center gap-4 h-[15vh] z-10">
        <Link to="/quote" className="w-full sm:w-auto">
          <button className="w-full sm:w-32 bg-pink-400 hover:bg-pink-500 h-12 sm:h-15 rounded-2xl border border-black text-lg sm:text-2xl text-white">
            Prev
          </button>
        </Link>
        <Link to="/gift1" className="w-full sm:w-auto">
          <button className="w-full sm:w-32 bg-pink-400 hover:bg-pink-500 h-12 sm:h-15 rounded-2xl border border-black text-lg sm:text-2xl text-white">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JourneyPage;
