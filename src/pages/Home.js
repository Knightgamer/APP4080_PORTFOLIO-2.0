import React from "react";
import Navigation from "./NavigationHome";
import ProfileCard from './ProfileCard';
import GitHubProfile from "./GitHubProfile";
const Home = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="container max-w-6xl">
        <div className="grid grid-cols-12 md:gap-10 justify-between lg:mt-[220px]">
          <div className="col-span-12 md:col-span-6">
            <ProfileCard />
          </div>
          <div className="col-span-12 md:col-span-6">
            <GitHubProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
