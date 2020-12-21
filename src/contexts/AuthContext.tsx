import React, { useEffect, useState } from "react";
import firebase from "firebase";
import app from "../services/firebase";

type ContextProps = {
    user: firebase.User | null;
    email: firebase.UserInfo | null;
    authenticated: boolean;
    setUser: any;
    setEmail: any;
    loadingAuthState: boolean;
};

export const AuthContext =  React.createContext<Partial<ContextProps>>({});
export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(null as firebase.User | null);
    const [email, setEmail] = useState(null as firebase.UserInfo | null);
    const [loadingAuthState, setLoadingAuthState] = useState(true);
    useEffect(() => {
            app.auth().onAuthStateChanged((user: any) => {
            setUser(user);
            setEmail(user.email);
            setLoadingAuthState(false);
        });
    }, []);

    return (
        <AuthContext.Provider
        value={{
            user,
            email,
            authenticated: user !== null,
            setUser,
            loadingAuthState
        }}>
        {children} 
    </AuthContext.Provider>
    );
}