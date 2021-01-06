import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';
import "./citycard.css"

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


function convertToCelsius(temperature: number | undefined): string {
    if (!temperature)
        return "";
    return (temperature - 273.15).toFixed(2);
}
interface Iproperties {
    weatherCondition: string;
    currTemperature: string;
    maxTemperature: string;
    minTemperature: string;
}

interface CityCardProps {
    city: string;
    style?: React.CSSProperties;
}
export default function CityCard({ city, style}: CityCardProps){
    let [properties, setProperties] = useState<Iproperties>()
    let weatherCondition = properties?.weatherCondition;
    let currTemperature = properties?.currTemperature
    let maxTemperature = properties?.maxTemperature;
    let minTemperature = properties?.minTemperature;
    let WeatherConditionIconUrl: string;
    
    const getWeather = useCallback(async () =>{
        let { data } = await api.get("/", {
            params : {
                "q" : city,
                "appid":  WEATHER_API_KEY
            }
        });
        setProperties({ 
            weatherCondition: data?.weather[0].main,
            currTemperature: convertToCelsius(data?.main.temp),
            maxTemperature: convertToCelsius(data?.main.temp_max),
            minTemperature: convertToCelsius(data?.main.temp_min)
        });
        console.log(data)
        
    }, [setProperties, city])
    
    useEffect(() => {
        getWeather();
    }, [getWeather])

    if (!weatherCondition){
        return <h1>Loading</h1>
    }

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
        <div className="card" style={style}>
            <div className="title">
                <h1>{city}</h1>
            </div>
            <div className="main-content">
                <img src={WeatherConditionIconUrl} alt="Weather Condition Icon Url"/>
                <h2>{currTemperature} &#176;</h2>
                <h2>{weatherCondition}</h2>
            </div>
            <div className="min-max-temperature">
                <div className="min-temperature">
                    <i className="fas fa-sort-down" ></i>
                    <div className="temperature">
                        {minTemperature}
                    </div>
                    <div className="min-text">
                        Min
                    </div>
                </div>
                <div className="max-temperature">
                    <i className="fas fa-sort-up" style={{color: "red"}}></i>
                    <div className="temperature">
                        {maxTemperature}
                    </div>
                    <div className="max-text">
                        Max
                    </div>
                </div>
            </div>
        </div>
    );
}