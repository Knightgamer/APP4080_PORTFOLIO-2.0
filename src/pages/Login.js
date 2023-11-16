import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Navigation from "./Navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, app } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to store the error message

  const navigateToSignUp = () => {
    navigate("/signup");
  };
  const navigateToForgotPassword = () => {
    navigate("/forgot-password");
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-login-credentials":
        return "Incorrect email or password";
      case "auth/user-disabled":
        return "This user account has been disabled.";
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Incorrect email or password.";
      // Add more cases as needed
      default:
        return "An error occurred. Please try again.";
    }
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
        setError(getErrorMessage(error.code)); // Set user-friendly error message
      });
  };
  return (
    <div className="App">
      <div>
        <Navigation />
      </div>
      <div className="mx-auto p-4 flex justify-center items-center h-[90vh]">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <h2 className="text-xl md:text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">
            Login to Your Account
          </h2>
          {error && (
            <div className="mb-4 text-center text-red-600">
              {error} {/* Display the error message */}
            </div>
          )}
          <form onSubmit={signIn}>
            {/* Email Input */}
            <div className="mb-4">
              <div className="flex items-center border-b border-gray-300 dark:border-gray-600 py-2">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-gray-400 mr-2"
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <div className="flex items-center border-b border-gray-300 dark:border-gray-600 py-2">
                <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>
            </div>
            <div className="text-right m-4">
              <button
                onClick={navigateToForgotPassword}
                className="text-sm md:text-base text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </button>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            >
              Login
            </button>
          </form>

          {/* Login with GitHub */}
          <button className="w-full flex items-center justify-center bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors mb-4">
            <FontAwesomeIcon icon={faGithub} className="mr-2" />
            Login with GitHub
          </button>

          {/* Register New User Button */}
          <button
            type="button"
            onClick={navigateToSignUp}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register New User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
