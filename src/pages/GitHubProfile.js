import React, { useEffect, useState } from "react";

const GitHubProfile = ({ accessToken }) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState(null);

  useEffect(() => {
    // Fetch GitHub profile
    fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch GitHub profile");
        }
        return response.json();
      })
      .then((data) => setProfile(data))
      .catch((error) => console.error(error));

    // Fetch repositories
    fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        return response.json();
      })
      .then((data) => setRepos(data))
      .catch((error) => console.error(error));
  }, [accessToken]);
  if (!profile || !repos) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {profile && (
        <div className="flex flex-col items-center p-4">
          <img
            className="w-24 h-24 rounded-full border-4 border-blue-500"
            src={profile.avatar_url}
            alt={profile.name}
          />
          <h1 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
            {profile.name}
          </h1>
        </div>
      )}

      {repos && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold p-4 text-gray-900 dark:text-white">
            Repositories
          </h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {repos.map((repo) => (
              <li
                key={repo.id}
                className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GitHubProfile;
