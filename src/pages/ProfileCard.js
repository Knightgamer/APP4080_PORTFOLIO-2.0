import {
  faDribbble,
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app, auth } from "../firebase";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileCard = ({ setGithubUsername }) => {
  const [user, setUser] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const firestore = getFirestore(app);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    skills: "",
    education: "",
    experience: "",
    contact: "",
    githubUsername: "",
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // If the field being changed is the GitHub username, update it in the Home component
    if (name === "githubUsername") {
      setGithubUsername(value);
    }
  };

  const fetchGitHubData = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        setGithubData(data);
        setGithubUsername(data.login); // Update the parent component's state
      } else {
        console.error("GitHub data fetch error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userProfileRef = doc(firestore, "userProfiles", currentUser.uid);
        const docSnap = await getDoc(userProfileRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFormData(userData);
          if (userData.githubUsername) {
            fetchGitHubData(userData.githubUsername);
          }
        } else {
          console.log("No such profile!");
        }
      }
    });
    return () => unsubscribe();
  }, [firestore]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const userProfileRef = doc(firestore, "userProfiles", user.uid);
      try {
        await setDoc(userProfileRef, {
          skills: formData.skills,
          education: formData.education,
          experience: formData.experience,
          contact: formData.contact,
          githubUsername: formData.githubUsername,
        });

        console.log("Profile updated!");
        setIsEditing(false);
        setGithubUsername(formData.githubUsername); // Update the githubUsername in the Home component
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const getAvatar = () => {
    return (
      githubData?.avatar_url ||
      `https://ui-avatars.com/api/?name=${formData.githubUsername}&background=E93B81&color=fff`
    );
  };

  return (
    <div className="col-span-12 lg:col-span-4 lg:h-screen lg:sticky top-44 ">
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
            {githubData?.name}
          </h1>
          {/* <h1 className="mt-6 mb-1 text-5xl font-semibold dark:text-white">
              {user?.login}
            </h1> */}
          {/* Display user's GitHub username */}
          {formData.githubUsername && (
            <p className="text-lg text-gray-500 dark:text-[#A6A6A6]">
              GitHub: {formData.githubUsername}
            </p>
          )}
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
              {/* Display the data fetched from Firestore */}
              {formData.skills && (
                <ContactItem
                  icon={faUser}
                  title="Skills"
                  content={formData.skills}
                />
              )}
              {formData.education && (
                <ContactItem
                  icon={faUser}
                  title="Education"
                  content={formData.education}
                />
              )}
              {formData.experience && (
                <ContactItem
                  icon={faUser}
                  title="Experience"
                  content={formData.experience}
                />
              )}
              {formData.contact && (
                <ContactItem
                  icon={faUser}
                  title="Contact"
                  content={formData.contact}
                />
              )}
            </>
          )}
        </div>
        <br />
        <div className="max-w-md mx-auto p-6 bg-gray-100 dark:bg-[#111111] rounded-lg shadow-lg">
          {/* Edit Profile Button */}
          <div className="text-center">
            <button
              onClick={handleEditClick}
              className="btn bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-4"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {isEditing && (
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 dark:text-white font-medium"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="githubUsername"
                  value={formData.githubUsername}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="skills"
                  className="block text-gray-700 dark:text-white font-medium"
                >
                  Skills
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="Your skills"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="education"
                  className="block text-gray-700 dark:text-white font-medium"
                >
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="Your education background"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="experience"
                  className="block text-gray-700 dark:text-white font-medium"
                >
                  Work Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Your work experience"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contact"
                  className="block text-gray-700 dark:text-white font-medium"
                >
                  Contact Information
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Your contact information"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Form buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="btn bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
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
