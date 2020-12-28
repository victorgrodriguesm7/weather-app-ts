import React from "react";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import "./header.css";

interface IThemeValue{
    isThemeDark: boolean; 
    setIsThemeDark(state: boolean): void;
}

interface ImenuActivate {
    menuActivate: boolean;
    setMenuActivate(state: boolean): void;
}

export default function Header({menuValue, theme}: any){
    let {menuActivate, setMenuActivate}: ImenuActivate = menuValue;
    let {isThemeDark, setIsThemeDark}: IThemeValue = theme;
    return (
        <>
            <section className="app-bar">
                <div className="left-section">
                    <i className="fas fa-bars" onClick={e => setMenuActivate(!menuActivate)}></i>
                    <Logo />
                </div>

                <h3>Today</h3>
                <div className="theme-switch">
                    <h4>Light</h4>
                    <label className="switch">
                        <input defaultChecked={isThemeDark} type="checkbox" onClick={e =>{localStorage.setItem("theme", (!isThemeDark).toString());setIsThemeDark(!isThemeDark)}}/>
                        <span className="slider"></span>
                    </label>
                    <h4>Dark</h4>
                </div>
            </section>
        </>
    );
}