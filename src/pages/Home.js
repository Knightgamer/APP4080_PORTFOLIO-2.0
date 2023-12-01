import React, { useState } from "react";
import GitHubProfile from "./GitHubProfile";
import Navigation from "./NavigationHome";
import ProfileCard from "./ProfileCard";
const Home = () => {
    const [githubUsername, setGithubUsername] = useState("");

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 lg:mt-[220px]">
        <div className="col-span-12 md:col-span-4 h-screen">
          <ProfileCard setGithubUsername={setGithubUsername} />
        </div>
        <div className="col-span-12 md:col-span-8">
          <GitHubProfile githubUsername={githubUsername} />
        </div>
      </div>
    </div>
  );
};

export default Home;