import { faCodeBranch, faEye, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const GitHubProfile = ({ githubUsername }) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    if (!githubUsername) {
      console.log("No GitHub username provided");
      return;
    }

    const fetchGitHubProfile = async () => {
      try {
        const profileResponse = await fetch(
          `https://api.github.com/users/${githubUsername}`
        );
        const profileData = await profileResponse.json();
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching GitHub profile:", error);
      }
    };

    const fetchRepositories = async () => {
      try {
        const reposResponse = await fetch(
          `https://api.github.com/users/${githubUsername}/repos`
        );
        if (!reposResponse.ok) {
          throw new Error(
            `Error fetching repositories: ${reposResponse.statusText}`
          );
        }
        const reposData = await reposResponse.json();

        const reposWithCommits = await Promise.all(
          reposData.map(async (repo) => {
            try {
              const commitsResponse = await fetch(
                repo.commits_url.replace("{/sha}", "?per_page=5")
              );
              if (!commitsResponse.ok) {
                throw new Error(
                  `Error fetching commits: ${commitsResponse.statusText}`
                );
              }
              const commitsData = await commitsResponse.json();

              // Ensure commitsData is an array before returning
              return {
                ...repo,
                commits: Array.isArray(commitsData) ? commitsData : [],
              };
            } catch (error) {
              console.error(`Error fetching commits for ${repo.name}:`, error);
              return { ...repo, commits: [] };
            }
          })
        );

        setRepos(reposWithCommits);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchGitHubProfile();
    fetchRepositories();
  }, [githubUsername]);

  if (!profile || !repos.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-300 dark:bg-[#111111] rounded-lg shadow-lg overflow-hidden">
      {/* User Profile */}
      <div className="flex flex-col items-center p-6 rounded-t-lg">
        <img
          className="w-24 h-24 rounded-full border-4 border-blue-500"
          src={profile.avatar_url}
          alt={profile.name || profile.login}
        />
        <h1 className="mt-4 text-4xl font-semibold text-gray-900 dark:text-white">
          {profile.name || profile.login}
        </h1>
        {/* User Bio */}
        {profile.bio && (
          <p className="text-center text-sm text-gray-600 dark:text-white mt-2">
            {profile.bio}
          </p>
        )}
      </div>

      {/* Repositories */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-4">
        <h2 className="text-lg font-semibold p-4 text-gray-900 dark:text-white">
          Repositories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-[#F3F6F6] dark:bg-[#1D1D1D] rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col p-6 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#44566C] dark:text-[#A6A6A6] font-semibold text-lg "
                >
                  {repo.name}
                </a>
                <p className="border-t border-[#E3E3E3] dark:border-[#3D3A3A] text-sm text-gray-600 mt-2">
                  {repo.description}
                </p>
                <div className="flex items-center justify-between mt-4 text-gray-500">
                  <span className="text-xs font-medium">
                    <FontAwesomeIcon icon={faStar} /> {repo.stargazers_count}
                  </span>
                  <span className="text-xs font-medium">
                    <FontAwesomeIcon icon={faCodeBranch} /> {repo.forks_count}
                  </span>
                  <span className="text-xs font-medium">
                    <FontAwesomeIcon icon={faEye} /> {repo.watchers_count}
                  </span>
                  <span className="text-xs font-medium">
                    {repo.languages
                      ? Object.keys(repo.languages).join(", ")
                      : "No languages"}
                  </span>
                </div>
              </div>
              {/* Recent Commits */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Recent Commits:
                </h3>
                <ul className="list-disc pl-5 text-sm">
                  {repo.commits &&
                    repo.commits.slice(0, 5).map((commit, index) => (
                      <li key={index} className="truncate">
                        <a
                          href={commit.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {commit.commit.message}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHubProfile;
