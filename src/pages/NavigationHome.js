import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faUserCircle,
  faCog,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import particlesConfigDark from "../particles.json";
import particlesConfigLight from "../particleslight.json";
import Particles from "react-particles";
import { auth } from "../firebase"; // Adjust this path based on your project structure
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

function Navigation() {
  const [theme, setTheme] = useState("light");
  const [particlesConfig, setParticlesConfig] = useState(particlesConfigLight);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // State to store user information

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    setParticlesConfig(
      theme === "dark" ? particlesConfigDark : particlesConfigLight
    );
  }, [theme]);
  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Unsubscribe on cleanup
  }, []);
  // Function to get the first initial
  const getInitial = () => {
    if (user) {
      return user.displayName
        ? user.displayName.charAt(0)
        : user.email.charAt(0);
    }
    return ""; // Return empty string if no user
  };
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/"); // Redirect to login or any other page
      })
      .catch((error) => {
        // An error happened.
        console.error("Logout error:", error);
      });
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
        <div classame="relative">
          <li className="list-none relative">
            <a
              href="#"
              className="flex items-center space-x-2 cursor-pointer"
              onClick={handleDropdown}
            >
              {/* User Avatar */}
              <img
                src={`https://ui-avatars.com/api/?name=${user?.email}&background=E93B81&color=fff`}
                className="w-8 h-8 rounded-full"
                alt="User Avatar"
              />
            </a>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-3 bg-white dark:bg-gray-900  rounded shadow-xl w-48">
                <div className="flex flex-col items-center px-4 py-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user?.email}&background=E93B81&color=fff`}
                    className="w-20 h-20 rounded-full"
                    alt="User Avatar"
                  />
                  <div className="text-center">
                    <p className="mt-2 text-gray-800 dark:text-gray-200 text-sm">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <ul className="list-none p-2">
                  <li className="py-2">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        className="mr-2 background-color=[#E93B81]"
                      />
                      Profile
                    </a>
                  </li>
                  <li className="py-2">
                    <a
                      href="#"
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </div>
      </div>
      <Particles options={particlesConfig} />
    </div>
  );
}

export default Navigation;
