import "./App.css";
import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  let [cityname, setcityname] = useState("");
  let [weatherdata, setweatherdata] = useState(); //initially weatherdata has value 'undefined'
 

  let getdata = (event) => {
    event.preventDefault();

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=751d66e130befad396405dc13796a57c&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.cod != "404") setweatherdata(data);
        if (data.cod == "404") setweatherdata(undefined);
      });

    setcityname("");
  };

  return (
    <div className="main">
      <div className="navbar">
        <div className="left">
          <h3>WeatherApp</h3>
        </div>
        <div className="middle">
          {weatherdata == undefined ? (
            ""
          ) : (
            <div>
              {weatherdata.name} {weatherdata.sys.country}
            </div>
          )}
        </div>
        <div className="right">
          <button>Sign in</button>
          <button>Log in</button>
        </div>
      </div>

      <div className="content">
        <div className="search">
          <form className="" onSubmit={getdata}>
            <input
              value={cityname}
              onChange={(e) => {
                setcityname(e.target.value);
              }}
              type="text"
              placeholder="Enter City Name"
            />
            <button type="submit">Search</button>
          </form>
        </div>

        {weatherdata != undefined ? (
          <div className="details">
            
            <div className="city">
              <h1>
                {weatherdata.name} {weatherdata.sys.country}
              </h1>
            </div>
            <div className="temp">
              {weatherdata.main.temp} <sup>o</sup>C
            </div>
            <div className="logo">
              <img
                className=""
                src={`http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`}
              />
            </div>
            <div className="atmosphere">{weatherdata.weather[0].main}</div>
          </div>
        ) : (
          <div className="details">No such city found</div>
        )}
      </div>
    </div>
  );
}

export default App;
