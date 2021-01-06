import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Cityilustrationlight } from '../../assets/city-ilustration-light.svg';
import './addCard.css';
interface AddCardProps {
    row?: number;
    column?: string;
}
export default function AddCard({ row = 2, column="2"}: AddCardProps){
    const history = useHistory();
    return (
        <div className="add-card"
            onClick={()=> history.push("/add")}
            style={{ gridRow: row, gridColumn: column}}>
            <div className="icon-button">
                <p>ADD CITY</p>
                <i className="add-icon fas fa-plus"></i>
            </div>
            <Cityilustrationlight />
        </div>
    );
}