import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import logo from "./logo.svg";
import "./App.css";
import particlesOptions from "./particles.json";
import Navigation from "./pages/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";


function App() {
  const particlesInit = useCallback((main) => {
    loadFull(main);
  }, []);

  return (
    <div className="App mx-8 flex flex-col justify-center theme-transition">
      <Login />
      <Particles options={particlesOptions} init={particlesInit} />

      {/* <Navigation /> */}
      {/* <Home /> */}
    </div>
  );
}

export default App;
