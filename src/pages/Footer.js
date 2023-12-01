import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-opacity-0 py-10">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm dark:text-white">
          © Shivam | Nayana | Arsen. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <FontAwesomeIcon icon={faGithub} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
