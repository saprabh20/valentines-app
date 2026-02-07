import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuotePage from "./pages/QuotePage";
import JourneyPage from "./pages/JourneyPage";
import GiftOnePage from "./pages/GiftOnePage";
import GiftTwoPage from "./pages/GiftTwoPage";
import GiftThreePage from "./pages/GiftThreePage";
import PickPlacesPage from "./pages/PickPlacesPage";
import FinalPage from "./pages/FinalPage";

function App() {
  return (
    <BrowserRouter>
    <div className="h-screen w-screen bg-pink-200 flex justify-center items-center">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/gift1" element={<GiftOnePage />} />
        <Route path="/gift2" element={<GiftTwoPage />} />
        <Route path="/gift3" element={<GiftThreePage />} />
        <Route path="/place" element={<PickPlacesPage />} />
        <Route path="/happyvalentinesday" element={<FinalPage />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} /> {/* Catch-all route */}
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
