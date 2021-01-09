import React from 'react';
import './cityforecast.css';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
interface CityForecastProps {
    time: number;
    weatherCondition: string;
    temperature: number;
}

export default function CityForecast({time, weatherCondition, temperature}: CityForecastProps){
    let WeatherConditionIconUrl: string;
    let weekDay = days[new Date(time).getDay()];
    if (weatherCondition === "Rain" || weatherCondition === "Drizzle" || weatherCondition === "Snow"){
        WeatherConditionIconUrl = require(`../../assets/weather-condition/rain.svg`).default;
    }else if (weatherCondition === "Sunny" || weatherCondition === "Clear"){
        WeatherConditionIconUrl = require(`../../assets/weather-condition/sunny.svg`).default;
    }else if (weatherCondition === "Mist" || weatherCondition === "Fog"){
        WeatherConditionIconUrl = require(`../../assets/weather-condition/fog.svg`).default;
    }else{
        WeatherConditionIconUrl = require(`../../assets/weather-condition/${weatherCondition.toLowerCase()}.svg`).default;
    }
    return (
        <div className="forecast-card" key={time}>
            <div className="forecast-details">
                <h1>{weekDay}</h1>
                <img className="WeatherConditionIcon" src={WeatherConditionIconUrl} alt="Weather Condition Icon Url"/>
                <h2>{weatherCondition}</h2>
                <h2>{temperature} &#176;</h2>
            </div>
        </div>
    );
}