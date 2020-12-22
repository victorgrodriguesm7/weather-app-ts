import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Cityilustrationlight } from '../../assets/city-ilustration-light.svg';
import './addCard.css';

export default function AddCard(){
    const history = useHistory();
    return (
        <div className="add-card"
            onClick={()=> history.push("/add")}>
            <div className="icon-button">
                <p>ADD CITY</p>
                <i className="add-icon fas fa-plus"></i>
            </div>
            <Cityilustrationlight />
        </div>
    );
}