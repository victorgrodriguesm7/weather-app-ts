import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import CityForecast from '../../components/cityforecast/cityforecast';
import Dashboard from '../../components/dashboard/dashboard';
import ThemeSwitch from '../../components/theme/theme';
import api from '../../services/api';
import app from '../../services/firebase';
import './index.css';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
function convertToCelsius(temperature: number | undefined): string {
    if (!temperature)
        return "";
    return (temperature - 273.15).toFixed(0);
}

interface IForecast {
    time: number;
    weather: string;
    temperature: number;
};
export default function DetailsPage(){
    const CityId = new URLSearchParams(useLocation().search).get("city") ?? "";
    const arrowLeft = require("../../assets/arrow-left.svg").default;
    const history = useHistory();
    let {isThemeDark, setIsThemeDark, darkTheme} = ThemeSwitch(true);
    let [svgUrl, setSvgUrl] = useState("");
    let [city, setCity] = useState("");
    let [currTemperature, SetCurrTemperature] = useState("");
    let [currWeather, setCurrWeather] = useState("");
    let [humidity, setHumidity] = useState("");
    let [wind, setWind] = useState("");
    let [forecast, setForecast] = useState<Array<IForecast>>(new Array<IForecast>());

    function mountForecastComponent() {
        let offset = new Array<number>();
        return forecast.map((value) => {
            let forecastDay = new Date(value.time * 1000).getDay();
            let today = new Date().getDay();
            if (forecastDay === today){
                return null
            }else if (offset.indexOf(forecastDay) === -1){
                offset.push(forecastDay);
                return (
                    <CityForecast
                        time={value.time * 1000}
                        weatherCondition={value.weather}
                        temperature={value.temperature}
                        key={value.time}/>
                );
            }else {
                return null;
            } 
        }).filter((value) => !(value === null))
    }
    const getForecast = useCallback(async (city: string) => {
        let { data } = await api.get("/forecast", {
            params: {
                "q": city,
                "appid" : WEATHER_API_KEY,
                "cnt": 40
            }
        });

        setForecast(
            data?.list.map((forecast: any) => {
                return ({
                    time: forecast.dt,
                    weather: forecast.weather[0].main,
                    temperature: convertToCelsius(forecast.main.temp),
                });
            })
        );
    }, [])
    const getWeather = useCallback(async (city: string) => {
        let { data } = await api.get("/weather", {
            params : {
                "q" : city,
                "appid":  WEATHER_API_KEY
            }
        });
        setHumidity(data?.main?.humidity);
        setWind(data?.wind?.speed);
        setCurrWeather(data?.weather[0]?.main);
        SetCurrTemperature(convertToCelsius(data?.main?.temp));
        getForecast(city);
    }, [getForecast])

    const getCityName = useCallback(async () =>{
        let url: string;
        let doc = await app.firestore().collection("Cities").doc(CityId).get();
        let data = doc.data();
        try {
            url = require(`../../assets/countries/${data?.country.toLowerCase()}.svg`).default;
        }catch (err){
            url = require("../../assets/countries/default.svg").default;
        }
        setSvgUrl(url)
        setCity(data?.city)
        getWeather(data?.city);
    }, [getWeather, CityId])

    useEffect(() => {
        getCityName();
    }, [getCityName])
    return (
        <div className="details" style={isThemeDark ? darkTheme : {}}>
            <Dashboard theme={{isThemeDark, setIsThemeDark}}/>
            <div className="main-content">
                <div className="icon">
                    <img className="arrow-left" src={arrowLeft} alt="arrow-left"
                        onClick={(e: any) => history.push("/")}/>
                </div>
                <div className="city-details">
                    <section className="weather" 
                        style={{backgroundImage: `url('${svgUrl}')`}}>
                        <div className="weather-details">
                            <div className="current-weather">
                                <h1>{currTemperature}&#8451;</h1>
                                <h2>{currWeather}</h2>
                            </div>
                            <div className="container">
                                <div className="humidity">
                                    <h3>Humidity</h3>
                                    <h4>{humidity}%</h4>
                                </div>
                                <hr/>
                                <div className="windSpeed">
                                    <h3>Wind</h3>
                                    <h4>{wind}k/m</h4>
                                </div>
                            </div>
                        </div>
                        <div className="city">
                            <h1>{city}</h1>
                            <hr/>
                        </div>
                    </section>
                    <section className="forecast">
                        {
                            mountForecastComponent()
                        }
                    </section>
                </div>
            </div>
            <div className="gradiant-circle-background"></div>
        </div>
    );
}