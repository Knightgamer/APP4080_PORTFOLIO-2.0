import { faMoon, faSignOutAlt, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Particles from "react-particles";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import particlesConfigDark from "../particles.json";
import particlesConfigLight from "../particleslight.json";

function Navigation() {
  const [theme, setTheme] = useState("light");
  const [particlesConfig, setParticlesConfig] = useState(particlesConfigLight);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // State to store user information

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    setParticlesConfig(
      theme === "dark" ? particlesConfigDark : particlesConfigLight
    );
  }, [theme]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((error) => console.error("Logout error:", error));
  };

  // Function to get either avatar URL or initials
  const getAvatar = () => {
    if (user) {
      // Check if the user has a photo URL (e.g., logged in through GitHub)
      if (user.photoURL) {
        return user.photoURL;
      }
      // If no photo URL, generate initials
      const initial = user.displayName
        ? user.displayName.charAt(0)
        : user.email.charAt(0);
      return `https://ui-avatars.com/api/?name=${initial}&background=E93B81&color=fff`;
    }
    return ""; // Return empty string if no user
  };

  return (
    <div className="flex justify-between items-center p-4">
      <p className="h-8 text-3xl text-gray-900 dark:text-gray-100">
        Your Profile Viewer
      </p>
      <div className="flex items-center">
        <button
          onClick={handleThemeSwitch}
          className="mr-4 flex items-center justify-center rounded border border-slate-800/90 px-3 py-1 text-slate-300 transition-colors duration-300 hover:text-amber-200"
        >
          <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
        </button>
        <div className="relative">
          <li className="list-none relative">
            <button
              type="button"
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={getAvatar()}
                className="w-8 h-8 rounded-full"
                alt="User Avatar"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-3 bg-white dark:bg-gray-900  rounded shadow-xl w-48">
                <div className="flex flex-col items-center px-4 py-3">
                  <img
                    src={getAvatar()}
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
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Logout
                    </button>
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
