import React, { useCallback, useEffect, useRef, useState } from "react";
import CitySearchedCard from "../../components/citysearchedcard/citysearchedcard";
import ComboBox from "../../components/combobox/combobox";
import Dashboard from "../../components/dashboard/dashboard";
import ThemeSwitch from "../../components/theme/theme";
import app from "../../services/firebase";
import "./index.css";

interface FirebaseFields {
    country: string;
    city: string;
    id: string;
}

export default function AddPage(){
    let {isThemeDark, setIsThemeDark, darkTheme} = ThemeSwitch();
    let [firebaseFields, setFireBaseFields] = useState(new Array<FirebaseFields>());
    let [citySearched, setCitySearched] = useState<string>();
    let [docId, setDocId] = useState("");
    let inputRef = useRef<HTMLInputElement>(null);
    let [randomCity, setRandomCity] = useState<FirebaseFields>();
    
    const getCities = useCallback(async () => {
        let docs = (await app.firestore().collection("Cities").get()).docs;
        let fields = docs.map(doc => {
            return {
                ...doc.data(),
                id : doc.id
            }
        }) as Array<FirebaseFields>;
        let randomCity = fields[Math.floor(Math.random() * (fields.length))];
        setFireBaseFields(fields);        
        setRandomCity(randomCity);
    }, []);

    useEffect(() => {
        getCities();
    }, [getCities])
    
    async function search(e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<void>{
        let city = inputRef.current?.value ?? "";
        let docId = firebaseFields.filter((value) => value.city === city)[0].id;
        setCitySearched(
            city
        );
        setDocId(
            docId
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
                            citySearched ? 
                            <CitySearchedCard
                                city={citySearched}
                                id={docId}
                                />: null
                        }
                    </div>
                </div>
                <div className="right-side">
                    <h1>Suggestion of City to follow</h1>
                    {
                        randomCity ?
                                <CitySearchedCard
                                    city={randomCity.city}
                                    id={randomCity.id}/>
                        : null
                        
                    }
                </div>
            </div>
        </div>
    );
}