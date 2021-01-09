import React from "react";
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import PrivateRoute from "./PrivateRoutes";
import HomePage from "./pages/home";
import AddPage from "./pages/add";
import { AuthProvider } from "./contexts/AuthContext";
import "./globals.css";
import DetailsPage from "./pages/details";


export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Switch>
                    <PrivateRoute path="/details" component={DetailsPage}/>
                    <PrivateRoute exact path="/add" component={AddPage}/>
                    <PrivateRoute exact path="/home" component={HomePage}/>
                    <Route exact path="/" component={LoginPage}/>
                    <Route path="/signup" component={SignUpPage}/>
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    );
}