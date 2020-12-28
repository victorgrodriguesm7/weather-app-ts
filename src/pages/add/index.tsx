import React, { useCallback, useEffect, useRef, useState } from "react";
import CitySearched from "../../components/citysearched/citysearched";
import ComboBox from "../../components/combobox/combobox";
import Dashboard from "../../components/dashboard/dashboard";
import ThemeSwitch from "../../components/theme/theme";
import api from "../../services/api";
import app from "../../services/firebase";
import "./index.css";

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
interface FirebaseFields {
    country: string;
    city: string;
}
export default function AddPage(){
    let {isThemeDark, setIsThemeDark, darkTheme} = ThemeSwitch();
    let [firebaseFields, setFireBaseFields] = useState(new Array<FirebaseFields>());
    let [citySearched, setCitySearched] = useState({data: null});
    let inputRef = useRef<HTMLInputElement>(null);
    
    const getCities = useCallback(async () => {
        let docs = (await app.firestore().collection("Cities").get()).docs;
        let fields = docs.map(doc => doc.data()) as Array<FirebaseFields>;
        setFireBaseFields(fields);
    }, []);

    useEffect(() => {
        getCities()
    }, [getCities])

    async function search(e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<void>{
        let city = inputRef.current?.value;
        setCitySearched(
            await api.get("/", {
                params : {
                    "q" : city,
                    "appid":  WEATHER_API_KEY
                }
            })
        );
    }

    return (
        <div className="addPage" style={isThemeDark ? darkTheme : {}}>
            <Dashboard theme={{isThemeDark, setIsThemeDark}}/>
            <div className="add-city-container">
                <div className="left-side">
                    <div className="search-header">
                        <h1>SEARCH CITIES</h1>
                        <label className="input">
                            <ComboBox
                                options={firebaseFields.map(field => field.city)}
                                ref={inputRef}
                                placeholder="Search City"/>                          
                            <i className="fas fa-search" onClick={search}></i>
                        </label>
                        
                    </div>
                    <div className="search-results">
                        {
                            citySearched.data ? <CitySearched data={citySearched.data}/>: null
                        }
                    </div>
                </div>
                <div className="right-side">
                </div>
            </div>
        </div>
    );
}