import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './navmenu.css';

interface IitemNavMenu {
    itemNavMenuSelected: boolean;
    setItemNavMenuSelected(state: boolean): void;
}

interface ImenuActivate {
    menuActivate: boolean;
    setMenuActivate(state: boolean): void;
}
export default function NavMenu({itemNavMenu, menuValue, changeItemFunction, handleLogoutFunction}: any){
    const history = useHistory();
    const userContext = useContext(AuthContext);
    const email = userContext.email;
    let changeItem = (e: React.MouseEvent<any, globalThis.MouseEvent>, state: boolean) => changeItemFunction;
    let handleLogout = (e: React.MouseEvent<any, globalThis.MouseEvent>) => handleLogoutFunction;
    let {itemNavMenuSelected, setItemNavMenuSelected}: IitemNavMenu = itemNavMenu;
    let {menuActivate, setMenuActivate}: ImenuActivate = menuValue;

    return (
        <>
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
        </>
    );
}