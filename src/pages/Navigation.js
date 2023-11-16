import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faUserCircle,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import particlesConfigDark from "../particles.json";
import particlesConfigLight from "../particleslight.json";
import Particles from "react-particles";

function Navigation() {
  const [theme, setTheme] = useState("light");
  const [particlesConfig, setParticlesConfig] = useState(particlesConfigLight);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    setParticlesConfig(
      theme === "dark" ? particlesConfigDark : particlesConfigLight
    );
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex justify-between items-center p-4">
      {/* <img src="/path-to-your-logo.png" alt="Logo" className="h-8" /> */}
      {/* Replace with your logo path */}
      <p className="h-8 text-3xl text-gray-900 dark:text-gray-100">
        Knightgamer
      </p>
      <div className="flex items-center">
        <button
          onClick={handleThemeSwitch}
          className="mr-4 flex items-center justify-center rounded border border-slate-800/90 px-3 py-1 text-slate-300 transition-colors duration-300 hover:text-amber-200"
        >
          <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
        </button>
        <div className="relative">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-2xl cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-xl">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faCog} className="pr-1" /> Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="pr-1" /> Logout
              </a>
            </div>
          )}
        </div>
      </div>
      <Particles options={particlesConfig} />
    </div>
  );
}

export default Navigation;
