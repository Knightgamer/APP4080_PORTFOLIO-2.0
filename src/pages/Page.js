"use client";

import { useEffect, useState } from "react";
import App from "../App.js";
import { starField } from "../utilities/starField.js";

export default function HomePage() {
  const [animation, setAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    starField();
  }, []);

  return (
    <div>
      <App />
    </div>
  );
}
