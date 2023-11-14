import React, { useState } from "react";
import "./../dine/abrarsdine.css"; 

const Image = () => {
  const [position, setPosition] = useState(50); // Initial position of the slider

  const handleSliderChange = (e) => {
    setPosition(e.target.value);
  };

  return (
    <div className="image-slider">
      <div className="image-container">
        <img alt="Before" src="https://i.ibb.co/D7Zz80K/1.png" />
        <div
          className="resizer"
          style={{ left: `${position}%` }}
        ></div>
        <img alt="After" src="https://i.ibb.co/mq11TyL/2.png" />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={handleSliderChange}
        className="slider"
      />
    </div>
  );
};

export default Image;
