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
      <div className="container w-full bg-[#F3F6F6] dark:bg-black lg:bg-transparent lg:dark:bg-transparent flex justify-between py-5 lg:px-0 lg:pt-[50px]">
        <div className="container grid grid-cols-12 md:gap-10 justify-between lg:mt-[220px]">
          <div className="col-span-12 lg:col-span-4 hidden lg:block h-screen sticky top-44">
            <ProfileCard />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <GitHubProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
