import React from "react";
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import PrivateRoute from "./PrivateRoutes";
import HomePage from "./pages/home";
import { AuthProvider } from "./contexts/AuthContext";
import "./globals.css";


export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Switch>
                    <PrivateRoute exact path="/home" component={HomePage}/>
                    <Route exact path="/" component={LoginPage}/>
                    <Route path="/signup" component={SignUpPage}/>
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    );
}