import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AddCard from "../../components/addcard/addCard";
import CityCard from "../../components/citycard/citycard";
import Dashboard from "../../components/dashboard/dashboard";
import ThemeSwitch from "../../components/theme/theme";
import { AuthContext } from "../../contexts/AuthContext";
import app from "../../services/firebase";

interface ICitiesFollowed{
    city: string;
    id: string;
}
export default function HomePage() {
    let {isThemeDark, setIsThemeDark, darkTheme} = ThemeSwitch();
    let [citiesFollowed, setCitiesFollowed] = useState(new Array<ICitiesFollowed>());
    let [row, setRow] = useState("1fr 1fr 1fr");
    const userContext = useContext(AuthContext);
    const history = useHistory();
    useEffect(() => {
        async function getUserCities(){
            let citiesFollowed = new Array<ICitiesFollowed>();
            let doc = await app.firestore().collection("Users").doc(userContext.user?.uid).get();
            let citiesFollowedId = doc?.data()?.citiesFollowed;
            if (!citiesFollowedId)
                return [];
            for (let cityFollwedId of citiesFollowedId){
                let cityDoc = await app.firestore().collection("Cities").doc(cityFollwedId).get();
                citiesFollowed.push({
                    city: cityDoc.data()?.city,
                    id: cityFollwedId
                });
            }

            console.log(typeof(citiesFollowed));
            return citiesFollowed;
        }

        getUserCities().then(
            (value) => {
                setCitiesFollowed(value);
                setRow(
                    citiesFollowed.length <= 3 ? "1fr 1fr 1fr" : "auto"
                )
            }
        );
    }, [])

    function details(id: string): void{
        history.push(`details?city=${id}`);
    }
    return (
        <div className="home" style={isThemeDark ? darkTheme : {}}>
            <Dashboard theme={{isThemeDark, setIsThemeDark}}/>
            <div className="card-container" style={{"--card-container-rows": row} as React.CSSProperties}>
                {
                    citiesFollowed.length ?
                        citiesFollowed.map((value, index) => {
                            let row = Math.floor(index / 3) + 2;
                            return (
                                <div className="card" 
                                style={{ gridRow: row}} 
                                key={value.id}
                                onClick={(e: any) => details(value.id)}>
                                    <CityCard
                                        city={value.city}/>
                                </div>
                            );
                        }) : null
                }
                <AddCard 
                    row={Math.floor(citiesFollowed.length / 3) + 2} 
                    column={citiesFollowed.length ? "auto" : "2"}/>
            </div>
        </div>
    );
}