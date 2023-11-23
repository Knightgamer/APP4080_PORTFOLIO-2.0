import React from "react";
import GitHubProfile from "./GitHubProfile";
import Navigation from "./NavigationHome";
import ProfileCard from "./ProfileCard";
const Home = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="grid grid-cols-12 md:gap-10 justify-between lg:mt-[220px]">
        <div className="col-span-12 md:col-span-4">
          <ProfileCard />
        </div>
        <div className="col-span-12 md:col-span-8">
          {" "}
          {/* Adjusted col-span to 8 */}
          <GitHubProfile />
        </div>
      </div>
    </div>
  );
};

export default Home;
