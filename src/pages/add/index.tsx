import React, { useState } from "react";
import Dashboard from "../../components/dashboard/dashboard";
import ThemeSwitch from "../../components/theme/theme";

export default function AddPage(){
    let {isThemeDark, setIsThemeDark, darkTheme} = ThemeSwitch();
    return (
        <div className="home" style={isThemeDark ? darkTheme : {}}>
            <Dashboard theme={{isThemeDark, setIsThemeDark}}/>
            <div className="add-city-container">
                
            </div>
        </div>
    );
}