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
      {/* <div className="container"> */}
        <div className="container grid grid-cols-12 md:gap-10 justify-between lg:mt-[220px]">
        <ProfileCard />
        <GitHubProfile />
      </div>
    </div>
  );
};

export default Home;
