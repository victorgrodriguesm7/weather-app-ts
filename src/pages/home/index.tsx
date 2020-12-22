import React from "react";
import AddCard from "../../components/addcard/addCard";
import Dashboard from "../../components/dashboard/dashboard";
import ThemeSwitch from "../../components/theme/theme";
import "./index.css";

export default function HomePage() {
    let {isThemeDark, setIsThemeDark, darkTheme} = ThemeSwitch();
    return (
        <div className="home" style={isThemeDark ? darkTheme : {}}>
            <Dashboard theme={{isThemeDark, setIsThemeDark}}/>
            <div className="card-container">
                <AddCard/>
            </div>
        </div>
    );
}