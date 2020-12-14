import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Cityilustrationlight } from '../../assets/city-ilustration-light.svg';
import { AuthContext } from "../../contexts/AuthContext";

import "./index.css";

export default function HomePage() {
    const userContext = useContext(AuthContext);
    const email = userContext.user?.email;
    let [menuActivate, setMenuActivate] = useState(false);
    console.log(userContext);
    return (
        <div className="home">
            <nav className={"nav-bar" + (menuActivate ? " activate" : "")}>
                <div className="content">
                    <section>
                        <h3>Welcome Back</h3>
                        <div className="profile">
                            <img src="https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png"/>
                            <div className="details">
                                <h4>{email}</h4>
                                <p>Free Plan</p>
                            </div> 
                        </div>
                    </section>
                    <div className="menu">
                        <Link to="/home"> Home</Link>
                        <Link to="/add">Add City</Link>
                        <p>Logout</p>
                    </div>
                </div>
                <div className="filter"></div>
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
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                    <h4>Dark</h4>
                </div>
            </section>
            <div className="card-container">
                <div className="add-card">
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