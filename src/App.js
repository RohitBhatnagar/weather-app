import React, { useState } from "react";

const api = {
  key: "731f818cf8msh4d9a42c1a7bd60ap151dcbjsn140ccae963a6",
  base: "https://community-open-weather-map.p.rapidapi.com/",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter")
      fetch(`${api.base}/weather?q=${query}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": api.key,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setWeather(res);
          setQuery("");
          console.log(res);
        })
        .catch((err) => console.error(err));
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? (parseInt(weather.main.temp) - 273.15).toFixed(2) > 30
            ? "app-warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search.."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div className="location-box">
          <div className="location">
            {weather.name}
            {weather.sys !== undefined ? ", " + weather.sys.country : ""}
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {weather.main !== undefined
              ? (parseInt(weather.main.temp) - 273.15).toFixed(2) + " C"
              : ""}
          </div>
          <div className="weather">
            {weather.weather !== undefined ? weather.weather[0].main : ""}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
