import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Cityilustrationlight } from '../../assets/city-ilustration-light.svg';
import { AuthContext } from "../../contexts/AuthContext";

import "./index.css";
import app from "../../services/firebase";

export default function HomePage() {
    const userContext = useContext(AuthContext);
    const email = userContext.email;
    const history = useHistory();
    let [menuActivate, setMenuActivate] = useState(false);
    let [itemNavMenuSelected, setItemNavMenuSelected] = useState(Boolean(localStorage.getItem("itemNavMenuSelected") ?? false));
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
        "--add-card-icon-background-color" : "rgb(57, 81, 138)",
        "--add-card-icon-border-color" : "rgb(57, 81, 138)",
        "--add-card-icon-color": "#e72c83"
    } as React.CSSProperties;
    
    if (isThemeDark)
        document.getElementsByTagName("body")[0].style.backgroundImage = "-webkit-gradient(linear,left top,left bottom,from(#372865),to(#000))";
    else
        document.getElementsByTagName("body")[0].style.backgroundImage = "var(--body-background-gradiant)"
    console.log(userContext);
    console.log("Theme: ", isThemeDark);
    function changeItem(e: React.MouseEvent<any, globalThis.MouseEvent>, state: boolean){
        setItemNavMenuSelected(state);
        localStorage.setItem("itemNavMenuSelected", state.toString());
    }
    
    function handleLogout(e: React.MouseEvent<any, globalThis.MouseEvent>){
        console.log("Deslogando")
        app.auth().signOut()
        .then(() => {
            history.push("/");
        }).catch(error => {
            console.log(error);
        });         
    }


    return (
        <div className="home" style={isThemeDark ? darkTheme : {}}>
            <nav className={"nav-bar" + (menuActivate ? " activate" : "")}>
                <div className="content">
                    <section>
                        <h3>Welcome Back</h3>
                        <div className="profile">
                            <img src={`https://avatars.dicebear.com/4.5/api/male/${email}.svg`} alt="avatar"/>
                            <div className="details">
                                <h4>{email}</h4>
                                <p>Free Plan</p>
                            </div> 
                        </div>
                    </section>
                    <div className="menu">
                        <a  className={"link " + ((itemNavMenuSelected) ? "selected" : "")}
                            onClick={(e) => {changeItem(e, false);history.push("/home")}}>Home</a>
                        <a className={"link " +((itemNavMenuSelected) ? "" : "selected")}
                            onClick={(e) => {changeItem(e, true);history.push("/add")}}>Add City</a>
                        <a onClick={(e)=> {handleLogout(e)}}>Logout</a>
                    </div>
                </div>
                <div className="filter" onClick={menuActivate ? () => {setMenuActivate(false)} : () => {}}></div>
            </nav>
            <section className="app-bar">
                <div className="left-section">
                    <i className="fas fa-bars" onClick={e => setMenuActivate(!menuActivate)}></i>
                    <Logo />
                </div>

                <h3>Today</h3>
                <div className="theme-switch">
                    <h4>Light</h4>
                    <label className="switch">
                        <input checked={isThemeDark} type="checkbox" onClick={e =>{localStorage.setItem("theme", (!isThemeDark).toString());setIsThemeDark(!isThemeDark)}}/>
                        <span className="slider"></span>
                    </label>
                    <h4>Dark</h4>
                </div>
            </section>
            <div className="card-container">
                <div className="add-card"
                    onClick={(e) => {changeItem(e, true);history.push("/add")}}>
                    <div className="icon-button">
                        <p>ADD CITY</p>
                        <i className="add-icon fas fa-plus"></i>
                    </div>
                    <Cityilustrationlight />
                </div>
            </div>
        </div>
    );
}