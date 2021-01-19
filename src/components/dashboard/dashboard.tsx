import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import app from "../../services/firebase";
import NavMenu from "../navmenu/navmenu";
import Header from "../header/header";
import swal from "sweetalert";
import "./dashboard.css";

interface IThemeValue{
    isThemeDark: boolean; 
    setIsThemeDark(state: boolean): void;
}

export default function Dashboard({theme}: any){
    const location = useLocation().pathname;
    const history = useHistory();
    let {isThemeDark, setIsThemeDark}: IThemeValue = theme;
    let [itemNavMenuSelected, setItemNavMenuSelected] = useState(location === "/home");
    let [menuActivate, setMenuActivate] = useState(false);
    function changeItem(e: React.MouseEvent<any, globalThis.MouseEvent>, state: boolean){
        setItemNavMenuSelected(state);
        localStorage.setItem("itemNavMenuSelected", state.toString());
    }
    
    function handleLogout(e: React.MouseEvent<any, globalThis.MouseEvent>){
        app.auth().signOut()
        .then(() => {
            history.push("/");
        }).catch(error => {
            swal({
                title: "Error",
                text: "Please try again",
                icon: "error"
            })
        });         
    }

    return (
        <>
            <NavMenu 
                itemNavMenu={{itemNavMenuSelected, setItemNavMenuSelected}}
                menuValue={{menuActivate, setMenuActivate}}
                changeItemFunction={changeItem}
                handleLogoutFunction={handleLogout}/>
            <Header
                menuValue={{menuActivate, setMenuActivate}}
                theme={{isThemeDark, setIsThemeDark}}/>
        </>
    );
}