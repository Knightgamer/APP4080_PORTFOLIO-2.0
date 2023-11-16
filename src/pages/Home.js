import React from "react";
import ProfileCard from "./ProfileCard";
import Navigation from "./NavigationHome";
const Home = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="container grid grid-cols-12 md:gap-10 justify-between lg:mt-[220px]">
        <ProfileCard />
      </div>
    </div>
  );
};

export default Home;
