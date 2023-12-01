import React, { useState } from 'react'
import './Weather-App.css'

import search_icon from '../assets/search_icon.png';
import clear_icon from '../assets/clear_icon.png';
import cloud_icon from '../assets/cloud_icon.png';
import drizzle_icon from '../assets/drizzle_icon.png';
import rain_icon from '../assets/rain_icon.png';
import snow_icon from '../assets/snow_icon.png';
import wind_icon from '../assets/wind_icon.png';
import humidity_icon from '../assets/humidity_icon.png';

export const WeatherApp = () => {

    let api_key = "147a2d8866b0bdb949b6f96386b65c80";
    
    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
          return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
      
        try {
          let response = await fetch(url);
          let data = await response.json();
      
          const humidity = document.getElementsByClassName("humidity-percent");
          const wind = document.getElementsByClassName("wind-rate");
          const temperature = document.getElementsByClassName("weather-temp");
          const location = document.getElementsByClassName("weather-location");
      
          if (data && data.main) {
            humidity[0].innerHTML = data.main.humidity + " %";
            wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
            temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";
            location[0].innerHTML = data.name;
      
            // Check weather icon
            if (data.weather && data.weather[0] && data.weather[0].icon) {
              const iconCode = data.weather[0].icon;
              if (iconCode === "01d" || iconCode === "01n") {
                setWicon(clear_icon);
              } else if (iconCode === "02d" || iconCode === "02n") {
                setWicon(cloud_icon);
              } else if (iconCode === "03d" || iconCode === "03n" || iconCode === "04d" || iconCode === "04n") {
                setWicon(drizzle_icon);
              } else if (iconCode === "09d" || iconCode === "09n" || iconCode === "10d" || iconCode === "10n") {
                setWicon(rain_icon);
              } else if (iconCode === "13d" || iconCode === "13n") {
                setWicon(snow_icon);
              } else {
                setWicon(clear_icon);
              }
            }
          } else {
            console.error("Invalid data format:", data);
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
      

  return (
    <div className='container'>
        <div className='top-bar'>
            <input type="text" className="cityInput" placeholder='Search'></input>
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">30°C</div>
        <div className="weather-location">Jakarta</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="" className="icon"/>
                <div className="data">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="" className="icon"/>
                <div className="data">
                    <div className="wind-rate">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}