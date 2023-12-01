import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Navigation from "./Navigation";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { auth, app } from "../firebase";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    // Add signup logic here
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SignUpWithGitHub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // Navigate to home with the GitHub token
        navigate("/home", { state: { accessToken: token } });
      })
      .catch((error) => {
        console.error("GitHub login error", error);
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
            Sign Up
          </h2>

          <form onSubmit={signUp}>
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
                  placeholder="Email Address"
                  value={email}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            >
              Sign Up
            </button>

            {/* Login with GitHub */}
            <button
              type="button"
              onClick={SignUpWithGitHub}
              className="w-full flex items-center justify-center bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors mb-4"
            >
              <FontAwesomeIcon icon={faGithub} className="mr-2" />
              Register with GitHub
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
