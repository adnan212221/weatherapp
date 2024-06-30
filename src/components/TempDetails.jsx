import React from "react";
import { FaThermometerEmpty } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { GiSunset } from "react-icons/gi";
import { GiSunrise } from "react-icons/gi";
import { FiWind } from "react-icons/fi";
import { BiSolidDropletHalf } from "react-icons/bi";
import "../components/tempsetails.scss";

const TempDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like
  }
}) => {
  const feelsdetails = [
    {
      Id: 1,
      Icon: <FaThermometerEmpty />,
      Title: "Real Feel",
      Value: `${feels_like.toFixed()}°`,
    },
    {
      Id: 2,
      Icon: <BiSolidDropletHalf />,
      Title: "Humidity",
      Value: `${humidity.toFixed()}%`,
    },
    {
      Id: 3,
      Icon: <FiWind />,
      Title: "Wind",
      Value: `${speed.toFixed()} km/h`,
    },
  ];

  const clouddetails = [
    {
      Id: 1,
      Icon: <GiSunrise />,
      Title: "Sunrise",
      Value: sunrise,
    },
    {
      Id: 2,
      Icon: <GiSunset />,
      Title: "Sunset",
      Value: sunset,
    },
    {
      Id: 3,
      Icon: <MdKeyboardArrowUp />,
      Title: "High",
      Value: `${temp_max.toFixed()}°`,
    },
    {
      Id: 4,
      Icon: <MdKeyboardArrowDown />,
      Title: "Low",
      Value: `${temp_min.toFixed()}°`,
    },
  ];

  return (
    <>
      <div className="cloudupdate mt-1">
        <h5>{details}</h5>
      </div>

      <div className="tempupdate">
        <img
          src={icon}
          alt="weather icon"
          className="cloudimg"
        />
        <p className="fs-1 text">{`${temp.toFixed()}`}°</p>

        <div className="feelsupdate">
          {feelsdetails.map((i) => {
            return (
              <div className="feelsupdates" key={i.Id}>
                <div className="feelsupdateicon ">{i.Icon}</div>
                <p className="feelsupdatevalue ms-3">{i.Title}</p>
                <p className="feelsupdatetitle ms-3">{i.Value}</p>
              </div>
            );
          })}
        </div>

        
      </div>

      <div className="d-flex justify-content-between cloudet mt-5 ">
            {
                clouddetails.map((i)=>{
                    return(
                        <div className="cloudupdate" key={i.Id}>
                            <p>{i.Icon} <span className="ms-1">{i.Title}</span> <span className="ms-1">{i.Value}</span></p> 
                        </div>
                    )
                })
            }
        </div>
    </>
  );
};

export default TempDetails;
