import React, { useState } from 'react';

const ThemeSwitch = () => {
    let [isThemeDark, setIsThemeDark] = useState(Boolean(localStorage.getItem("theme") === "true"));
    let darkTheme = {
        "--app-bar-background-color": "#2b244d",
        "--app-bar-text-color" : "white",
        "--nav-bar-profile-background" : "linear-gradient(to top,#30cfd0 0,#330867 100%)",
        "--nav-bar-profile-text-color" : "white",
        "--nav-bar-content-background-color" : "#2b244d",
        "--nav-bar-menu-text-color" : "white",
        "--card-background-color": "linear-gradient(to bottom,#711b86,#00057a)",
        "--card-title-color" : "white",
        "--city-searched-card-background" : "linear-gradient(to bottom,#711b86,#00057a)",
        "--city-searched-card-text-color" : "white",
        "--add-card-icon-background-color" : "rgb(57, 81, 138)",
        "--add-card-icon-border-color" : "rgb(57, 81, 138)",
        "--add-card-icon-color": "#e72c83",
    } as React.CSSProperties;
    
    if (isThemeDark)
        document.getElementsByTagName("body")[0].style.backgroundImage = "-webkit-gradient(linear,left top,left bottom,from(#372865),to(#000))";
    else
        document.getElementsByTagName("body")[0].style.backgroundImage = "var(--body-background-gradiant)"
    
    return {
        isThemeDark,
        setIsThemeDark,
        darkTheme
    };
}

export default ThemeSwitch;