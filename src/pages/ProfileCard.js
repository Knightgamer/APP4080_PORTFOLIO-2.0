import {
  faDribbble,
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDownload,
  faEnvelope,
  faMapMarkerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

const ProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null); // State to store user information
  const [githubData, setGithubData] = useState(null); // State for GitHub data

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Assuming the GitHub access token is stored in the user's profile
        fetchGitHubData(currentUser.accessToken);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchGitHubData = (accessToken) => {
    fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGithubData(data);
      })
      .catch((error) => console.error("Error fetching GitHub data:", error));
  };
  // Function to get user avatar
  const getAvatar = () => {
    return (
      user?.photoURL ||
      githubData?.avatar_url ||
      `https://ui-avatars.com/api/?name=${user?.email?.charAt(
        0
      )}&background=E93B81&color=fff`
    );
  };

  return (
    <div className="col-span-12 lg:col-span-4 lg:h-screen lg:sticky top-44">
      <div className="w-full mb-6 lg:mb-0 mx-auto relative bg-gray-300 dark:bg-[#111111] px-6 rounded-[20px] mt-[180px] md:mt-[220px] lg:mt-0">
        {" "}
        <img
          alt="avatar"
          src={getAvatar()}
          className="w-[240px] absolute left-[50%] transform -translate-x-[50%] h-[240px] drop-shadow-xl mx-auto rounded-[20px] -mt-[140px]"
          loading="lazy"
        />
        <div className="pt-[100px] pb-8">
          <h1 className="mt-6 mb-1 text-5xl font-semibold dark:text-white">
            {user?.displayName}
          </h1>
          <h3 className="mb-4 text-[#7B7B7B] inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg dark:text-[#A6A6A6]">
            Ui/Ux Designer
          </h3>
          <div className="flex justify-center space-x-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} className="text-[#1773EA]" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} className="text-[#1C9CEA]" />
            </a>
            <a
              href="https://dribbble.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faDribbble} className="text-[#e14a84]" />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} className="text-[#0072b1]" />
            </a>
          </div>
        </div>
        <div className="p-7 rounded-2xl mt-7 bg-[#F3F6F6] dark:bg-[#1D1D1D]">
          {/* Display GitHub Data */}
          {user && (
            <>
              <ContactItem
                icon={faUser}
                title="GitHub Username"
                content={user.userName}
              />
              <ContactItem
                icon={faEnvelope}
                title="GitHub Email"
                content={user.email || "Not available"}
              />
              <ContactItem
                icon={faMapMarkerAlt}
                title="GitHub Location"
                content={user.location || "Nairobi"}
              />
              {/* ... other GitHub data fields */}
            </>
          )}
        </div>
        {/* <a
          href="/path-to-your-cv.pdf" // Make sure this path points to your actual CV PDF
          download
          className="inline-flex items-center mx-auto bg-gradient-to-r from-red-500 to-pink-500 duration-200 transition ease-linear hover:bg-gradient-to-l to-pink-500 from-red-500 px-8 py-3 text-lg text-white rounded-[35px] mt-6 mb-6"
        >
          <FontAwesomeIcon icon={faDownload} className="mr-2" />
          Download CV
        </a> */}
        <br />
      </div>
    </div>
  );
};

const ContactItem = ({ icon, title, content, link }) => (
  <div className="flex py-2.5 border-b border-[#E3E3E3] dark:border-[#3D3A3A]">
    <span className="flex-shrink-0 p-2 bg-white dark:bg-black rounded-full">
      <FontAwesomeIcon icon={icon} className="text-[#E93B81]" />
    </span>
    <div className="text-left ml-2.5">
      <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">{title}</p>
      {link ? (
        <a
          href={link}
          className="dark:text-white break-all hover:text-[#FA5252] duration-300 transition"
        >
          {content}
        </a>
      ) : (
        <p className="dark:text-white break-all">{content}</p>
      )}
    </div>
  </div>
);

export default ProfileCard;
