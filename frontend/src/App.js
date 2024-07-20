import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/landing-page.js";
import Hangman from "./components/hangman.js";
import HighScores from "./components/highscores.js";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hangman" element={<Hangman />} />
        <Route path="/highscores/:wordLength" element={<HighScores />} />
      </Routes>
    </div>
  );
};

export default App;
