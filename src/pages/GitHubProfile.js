import { faCodeBranch, faEye, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const GitHubProfile = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const location = useLocation();
  const accessToken = location.state?.accessToken;
  // useEffect(() => {
  //   if (accessToken) {
  //     fetch("https://api.github.com/user", {
  //       headers: {
  //         Authorization: `token ${accessToken}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data); // You can see all the available data in the console
  //         // Process and use the data as needed
  //       })
  //       .catch((error) => console.error("Error fetching user details:", error));
  //   }
  // }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      console.error("No access token provided");
      return;
    }

    // Fetch GitHub profile
    fetch("https://api.github.com/user", {
      headers: { Authorization: `token ${accessToken}` },
    })
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error("Error fetching GitHub profile:", error));

    // Fetch repositories
    fetch("https://api.github.com/user/repos", {
      headers: { Authorization: `token ${accessToken}` },
    })
      .then((response) => response.json())
      .then(async (reposData) => {
        // Fetch languages for each repository
        const reposWithLanguages = await Promise.all(
          reposData.map(async (repo) => {
            const languagesResponse = await fetch(repo.languages_url, {
              headers: { Authorization: `token ${accessToken}` },
            });
            const languages = await languagesResponse.json();
            return { ...repo, languages };
          })
        );
        setRepos(reposWithLanguages);
      })
      .catch((error) => console.error("Error fetching repositories:", error));
  }, [accessToken]);

  if (!profile || !repos.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-300 dark:bg-[#111111] rounded-lg shadow-md overflow-hidden">
      {/* User Profile */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col items-center p-4 dark:bg-gray">
          {/* <img
        className="w-24 h-24 rounded-full border-4 border-blue-500"
        src={profile.avatar_url}
        alt={profile.name || profile.login}
      /> */}
          <h1 className="mt-2 text-4xl font-semibold text-gray-900 dark:text-white">
            {profile.name || profile.login}
          </h1>
        </div>
      </div>

      {/* Repositories */}
      <div className="w-full max-w-3xl border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold p-4 text-gray-900 dark:text-white">
          Repositories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col p-4">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {repo.name}
                  </a>
                  <p className="text-sm text-gray-600">{repo.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-medium text-gray-500">
                      <FontAwesomeIcon icon={faStar} /> {repo.stargazers_count}
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      <FontAwesomeIcon icon={faCodeBranch} /> {repo.forks_count}
                    </span>
                    {/* <span className="text-xs font-medium text-gray-500">
                  <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                  {repo.open_issues_count}
                </span> */}
                    <span className="text-xs font-medium text-gray-500">
                      <FontAwesomeIcon icon={faEye} /> {repo.watchers_count}
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      {repo.languages
                        ? Object.keys(repo.languages).join(", ")
                        : "No languages"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHubProfile;
