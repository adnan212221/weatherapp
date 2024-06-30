import { DateTime } from "luxon";

const API_KEY = "be7a33ef685452611acdfb4c61f5039b";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (infotype, searchparam) => {
  const url = new URL(BASE_URL + infotype);
  url.search = new URLSearchParams({ ...searchparam, appid: API_KEY });

  return fetch(url)
    .then((res) => res.json())
};

const iconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`

const formatLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL, yyyy' | Local time: 'hh:mm a"
)=> DateTime.fromSeconds(secs + offset, {zone: "utc"}).toFormat(format);

const formatCurrent = (data)=>{
  const {
    coord: {lat, lon},
    main: {temp, feels_like, temp_min, temp_max, humidity},
    name,
    dt,
    sys: {country, sunrise, sunset},
    weather,
    wind: {speed},
    timezone,
  } = data;

  const {main: details, icon} = weather[0];
  const formattedLocalTime = formatLocalTime(dt, timezone);

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    sunrise: formatLocalTime(sunrise, timezone, 'hh:mm a'),
    sunset: formatLocalTime(sunset, timezone, 'hh:mm a'),
    speed,
    details,
    icon: iconUrl(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon

  };
};

const formatForecastWeather = (secs, offset, data) =>{
  const hourly = data.filter((f)=> f.dt > secs).map((f)=>({
    temp: f.main.temp,
    title: formatLocalTime(f.dt, offset, "hh:mm a"),
    icon: iconUrl(f.weather[0].icon),
    date: f.dt_txt
  }))
  .slice(0,5);


  const daily = data.filter((f)=> f.dt_txt.slice(-8) === "00:00:00").map(f=>({
    temp: f.main.temp,
    title: formatLocalTime(f.dt, offset, "ccc"),
    icon: iconUrl(f.weather[0].icon),
    date: f.dt_txt
  }))



  return{hourly, daily}
}


const getFormattedWeatherData = async(searchparam)=>{
  const formatCurrentWeather = await getWeatherData('weather', searchparam).then(formatCurrent);

  const {dt, lat, lon, timezone} = formatCurrentWeather;
  const formattedForcastWeather = await getWeatherData('forecast', {
    lat,
    lon,
    units: searchparam.units,
  }).then((d)=> formatForecastWeather(dt, timezone, d.list));

  return{...formatCurrentWeather, ...formattedForcastWeather}
}


export default getFormattedWeatherData;