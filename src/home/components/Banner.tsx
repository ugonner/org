import React, { useState, useEffect } from "react";
import "./Banner.css";
import { isPlatform } from "@ionic/react";

const slides = [
  {
    top: "Disability Bridge Building.",
    bottom:
      "African Diaspora Disability Collective Representative connects you to the real people and their real needs.",
    backgroundImage: "/images/banners/banner-1.webp",
  },
  {
    top: "Seamless Culture Adaptation.",
    bottom:
      "Mindful of the cultural diversities, ADDCR smoothly puts in every shades of culture maximizing project impacts.",
    backgroundImage: "/images/banners/banner-3.webp",
  },
  {
    top: "Innovative Solutions.",
    bottom:
      "With robust and dynamic team, ADDCR constantly innovates projects and execution models to optimally drive excellence in delivery and social impact for persons with disabilities.",
    backgroundImage: "/images/banners/banner-2.jpg",
  },
];

export default function Banner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 10000); // 5 seconds per slide

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="slider-container"
      style={{
        backgroundImage: `url(${slides[active].backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh"
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${active === index ? "active" : ""}`}
        >
          <p className="top-text">
            <p
               style={{
              fontSize: isPlatform("desktop") ? "4em" : "2em",
              fontWeight: 1000,
            }}
         >
          {slide.top}
         </p>
          <p
            style={{
              width: isPlatform("desktop") ? "50%" : "100%",
              fontWeight: 500,
            }}
          >{slide.bottom}</p>
          </p>
          <p
            className="bottom-text"
          >
            ...
          </p>
        </div>
      ))}
    </div>
  );
}
