import React from "react";
import GitHubProfile from "./GitHubProfile";
import Navigation from "./NavigationHome";
const Home = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="container">
        {/* <div className="container grid grid-cols-12 md:gap-10 justify-between lg:mt-[220px]"> */}
        {/* <ProfileCard /> */}
        <GitHubProfile />
      </div>
    </div>
  );
};

export default Home;
