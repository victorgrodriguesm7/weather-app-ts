import firebase from 'firebase';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import swal from 'sweetalert';
import app from '../../services/firebase';
import "./citysearchedcard.css";
import CityCard from '../citycard/citycard';

export default function CitySearchedCard({ city, id }: any){
    let userContext = useContext(AuthContext);
    let [isAlreadyAdded, setIsAlreadyAdded] = useState(Boolean);
    
    const isCityAlreadyAdded = useCallback(async () => {
        let isAlreadyAdded: Array<string> = (
            await app.firestore().collection("Users")
                .doc(userContext.user?.uid).get())
                .data()?.citiesFollowed?.filter((value: string) => value === id);
        return isAlreadyAdded?.length ? true : false;
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
            <CityCard city={city}/>
            <div className="add-button">
                {
                    isAlreadyAdded ? <button>City Already Added</button> : 
                    <button onClick={addCity}>Add City +</button>
                }
            </div> 
        </div>
    );
}