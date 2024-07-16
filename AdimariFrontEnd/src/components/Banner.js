import React from "react";
import "./Banner.css";

function Banner({ title, subtitle}) {
  return (
    <div className="banner-conatiner">
      <h1>{title}</h1>
        <p>{subtitle}</p>
    </div>
  );


}

export default Banner;