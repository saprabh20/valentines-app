import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeartBackground from "../components/HeartBackground";
import { supabase } from "../supabaseClient";

const STORAGE_KEY = "selected_date_place";

const PickPlacesPage = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = sessionStorage.getItem("date_place_list");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setItems(parsed);
        const sel = sessionStorage.getItem(STORAGE_KEY);
        if (sel) setSelectedId(JSON.parse(sel).id);
      } catch {}
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("date_place_list", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!input.trim() || items.length >= 3) return;
    const id = Date.now();
    setItems((s) => [...s, { id, text: input.trim() }]);
    setInput("");
  };

  const chooseItem = (id) => {
    setSelectedId(id);
    const chosen = items.find((i) => i.id === id);
    if (chosen) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(chosen));
    }
  };

  const canDecide = items.length === 3 && selectedId !== null && !saving;

  const handleNext = async () => {
    if (!canDecide) return;

    const chosen = items.find((i) => i.id === selectedId);
    if (!chosen) return;

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(chosen));

    setSaving(true);
    try {
      const { error } = await supabase
        .from("valentine_choice")
        .insert({ place: chosen.text });

      if (error) {
        console.error("Save choice error:", error);
      }
    } finally {
      setSaving(false);
      navigate("/happyvalentinesday");
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center relative">
      <HeartBackground />

      <header className="w-full px-4 sm:px-6 lg:px-40 py-6 sm:py-10 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-pink-500">
            Pick a Place
          </h1>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 lg:px-40 pb-8 z-10 flex-1">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm sm:text-lg text-pink-400 mb-4">
            Add exactly three places and choose one.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              className="flex-1 border border-pink-200 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-200"
              placeholder="Add a date place"
              aria-label="Add a date place"
            />
            <button
              onClick={addItem}
              disabled={!input.trim() || items.length >= 3}
              className="w-full sm:w-auto bg-pink-400 hover:bg-pink-500 px-4 py-3 rounded-lg text-white disabled:bg-pink-200 disabled:cursor-not-allowed text-sm sm:text-base"
              aria-disabled={!input.trim() || items.length >= 3}
            >
              Add
            </button>
          </div>

          <div className="space-y-3">
            {items.length === 0 && (
              <p className="text-sm text-pink-300">No places added yet.</p>
            )}

            {items.map((it, idx) => (
              <div
                key={it.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-xl p-4 border ${
                  selectedId === it.id ? "border-pink-400" : "border-pink-100"
                }`}
              >
                <div className="flex items-start sm:items-center gap-4 w-full">
                  <input
                    type="radio"
                    checked={selectedId === it.id}
                    onChange={() => chooseItem(it.id)}
                    className="accent-pink-400 w-5 h-5 mt-1 sm:mt-0"
                    disabled={items.length !== 3}
                    title={
                      items.length !== 3
                        ? "Add exactly 3 options to select"
                        : ""
                    }
                    aria-label={`Select option ${idx + 1}`}
                  />
                  <div className="flex-1">
                    <div className="text-base sm:text-lg text-pink-500 font-semibold break-words">
                      {it.text}
                    </div>
                    <div className="text-xs sm:text-sm text-pink-300">
                      Option {idx + 1}
                    </div>
                  </div>
                </div>

                <div className="mt-3 sm:mt-0 sm:ml-4 flex-shrink-0">
                  <button
                    onClick={() => {
                      setItems((s) => s.filter((x) => x.id !== it.id));
                      if (selectedId === it.id) {
                        setSelectedId(null);
                        sessionStorage.removeItem(STORAGE_KEY);
                      }
                    }}
                    className="px-3 py-1 rounded-md bg-white border border-pink-200 hover:bg-pink-50 text-pink-500 text-sm"
                    aria-label={`Remove option ${idx + 1}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* actions: mobile stacked full-width, desktop preserved */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="/gift3" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-pink-400 hover:bg-pink-500 rounded-2xl px-6 py-3 text-lg text-white border border-black">
                Prev
              </button>
            </Link>

            <button
              onClick={handleNext}
              disabled={!canDecide}
              className="w-full sm:w-auto bg-pink-400 hover:bg-pink-500 rounded-2xl px-6 py-3 text-lg text-white border border-black disabled:bg-pink-200 disabled:cursor-not-allowed"
              title={
                items.length !== 3
                  ? "Add 3 options first"
                  : selectedId === null
                  ? "Select one option"
                  : ""
              }
              aria-disabled={!canDecide}
            >
              {saving ? "Saving..." : "Decide"}
            </button>
          </div>
        </div>
      </main>

      <footer className="w-full h-20 sm:h-[15vh] z-10" />
    </div>
  );
};

export default PickPlacesPage;
