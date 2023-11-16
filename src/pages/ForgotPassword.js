import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Navigation from "./Navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase"; // Ensure you have this file set up with Firebase

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const resetPassword = async (e) => {
    e.preventDefault();

    //   const emailval = e.target.email.value;
    sendPasswordResetEmail(auth, email)
      .then((data) => {
        alert("Password reset email sent!");
        // Show a success message or handle redirection
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
        alert(error.code);
        // Handle errors (like user not found)
      });
  };

  return (
    <div className="App">
      <div>
        <Navigation />
      </div>
      <div className="mx-auto p-4 flex justify-center items-center h-[90vh]">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">
            Reset Password
          </h2>

          <form onSubmit={resetPassword}>
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
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
