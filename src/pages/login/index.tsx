import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function LoginPage(){
    return (
        <div className="login-box">
            <form className="login-form">
                <h1>Login</h1>
                <div className="email">
                    <input type="text" placeholder="Email" autoComplete="new-email"/>
                </div>
                <div className="password">
                    <input type="password" placeholder="Password"/>
                </div>
                <button>Login</button>
                <p>Don't have an account? <Link to="/signup">SIGN UP</Link></p>
            </form>
            <div className="image-aside">
                <h1>Welcome Back!</h1>
                <hr/>
            </div>
        </div>
    );
}