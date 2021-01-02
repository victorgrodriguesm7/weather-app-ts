import firebase from 'firebase';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import swal from 'sweetalert';
import app from '../../services/firebase';
import "./citysearchedcard.css";

function convertToCelsius(temperature: number): string {
    return (temperature - 273.15).toFixed(2);
}

export default function CitySearchedCard({ data, country, id}: any){
    let userContext = useContext(AuthContext);
    let [isAlreadyAdded, setIsAlreadyAdded] = useState(Boolean);
    let city = data.name;
    let WeatherConditionIconUrl: string;
    let weatherCondition = data.weather[0].main;
    let currTemperature = convertToCelsius(data.main.temp);
    let maxTemperature = convertToCelsius(data.main.temp_max);
    let minTemperature = convertToCelsius(data.main.temp_min);
    
    if (weatherCondition === "Rain" || weatherCondition === "Drizzle" || weatherCondition === "Snow"){
        WeatherConditionIconUrl = require(`../../assets/weather-condition/rain.svg`).default;
    }else if (weatherCondition === "Sunny" || weatherCondition === "Clear"){
        WeatherConditionIconUrl = require(`../../assets/weather-condition/sunny.svg`).default;
    }else if (weatherCondition === "Mist" || weatherCondition === "Fog"){
        WeatherConditionIconUrl = require(`../../assets/weather-condition/fog.svg`).default;
    }else{
        WeatherConditionIconUrl = require(`../../assets/weather-condition/${weatherCondition.toLowerCase()}.svg`).default;
    }

    const isCityAlreadyAdded = useCallback(async () => {
        let isAlreadyAdded: Array<string> = (
            await app.firestore().collection("Users")
                .doc(userContext.user?.uid).get())
                .data()?.citiesFollowed.filter((value: string) => value === id);
        console.log(isAlreadyAdded.length)
        return isAlreadyAdded.length ? true : false;
    }, [id, userContext]);
    
    async function addCity(e: React.MouseEvent<HTMLElement, MouseEvent>){
        await app.firestore().collection("Users").doc(userContext.user?.uid)
        .set({
            citiesFollowed : firebase.firestore.FieldValue.arrayUnion(id),
        }, {merge : true})
        swal({
            text: "City Added Successfully",
            icon: "success"
        })
    }

    useEffect(() => {
        isCityAlreadyAdded().then(setIsAlreadyAdded);
    }, [isCityAlreadyAdded])

    return (
        <div className="City-Searched-Card">
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
            <div className="add-button">
                {
                    isAlreadyAdded ? <button>City Already Added</button> : 
                    <button onClick={addCity}>Add City +</button>
                }
            </div> 
        </div>
    );
}