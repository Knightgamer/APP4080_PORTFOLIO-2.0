import React, { useCallback } from "react";
import Particles from "react-particles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { loadFull } from "tsparticles";
import "./App.css";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import particlesOptions from "./particles.json";

function App() {
  const particlesInit = useCallback((main) => {
    loadFull(main);
  }, []);

  return (
    <Router>
      <div className="App mx-8 flex flex-col justify-center theme-transition">
        <Particles options={particlesOptions} init={particlesInit} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
