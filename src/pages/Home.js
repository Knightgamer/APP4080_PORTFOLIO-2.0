import React from "react";
import ProfileCard from "./ProfileCard";
const Home = () => {
  return (
    <div className="container grid grid-cols-12 md:gap-10 justify-between lg:mt-[220px]">
      <ProfileCard />
    </div>
  );
};

export default Home;
