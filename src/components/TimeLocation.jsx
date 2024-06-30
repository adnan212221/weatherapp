import React from "react";
import "../components/timelocaion.scss";

const TimeLocation = ({weather: {formattedLocalTime, name, country}}) => {
  return (
    <>
      <div className="timediv">
        <div className="datendtime">
          <p>
            {formattedLocalTime}
          </p>
        </div>
      </div>

      <div className="cityname">
        <h3>{`${name}, ${country}`}</h3>
      </div>
    </>
  );
};

export default TimeLocation;
