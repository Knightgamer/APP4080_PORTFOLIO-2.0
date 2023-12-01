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
      <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 lg:mt-[220px]">
        <div className="col-span-12 md:col-span-4 h-screen">
          <ProfileCard />
        </div>
        <div className="col-span-12 md:col-span-8">
          <GitHubProfile />
        </div>
      </div>
    </div>
  );
};

export default Home;
// import React from "react";
// import GitHubProfile from "./GitHubProfile";
// import Navigation from "./NavigationHome";
// import ProfileCard from "./ProfileCard";
// const Home = () => {
//   return (
//     <div>
//       <div>
//         <Navigation />
//       </div>
//       <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
//         <div className="col-span-12 md:col-span-0 lg:col-span-3 h-screen">
//           <ProfileCard />
//         </div>
//         <div className="col-span-12 md:col-span-0 lg:col-span-9">
//           <GitHubProfile />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
