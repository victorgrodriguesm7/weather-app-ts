import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from 'sweetalert';
import app from "../../services/firebase";
import { AuthContext } from "../../contexts/AuthContext";

import "./index.css";

export default function LoginPage(){
    const userContext = useContext(AuthContext);
    const history = useHistory();
    if (userContext.authenticated)
        history.push("/home")
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [backgroundImage, setBackgroundImage] = useState({} as React.CSSProperties);
    let [index, setIndex] = useState(0);
    
    function handleLogin(event: React.FormEvent){
        event.preventDefault();
        console.log("Logando")
        app.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            userContext.setUser(res);
            console.log("LOGADO", userContext)
            console.log(res, 'res');
            history.push("/home");
        })
        .catch(error => {
            console.log(error.message);
            swal({
                title: "Error",
                text: "Please try again",
                icon: "error"
            })
        })
    }
    const getBackground = useCallback(
        async (): Promise<React.CSSProperties> => {
            async function getNewImage(): Promise<any>{
                let images = [
                    "mountain",
                    "river-florest",
                    "road"
                ];
                let random = Math.floor(Math.random() * 3);
                if (random === index)
                    return getNewImage();                
                setIndex(random);
                return (await import(`../../assets/login-carousel/${images[random]}.jpg`)).default;
            }

            let image = await getNewImage();
            console.log(image);
            let style =  {
                "--background" : `url(${image})`
            } as React.CSSProperties
            return style;
        }, [index]
    )

    useEffect(() =>{
        const interval = setInterval(
            () => getBackground().then(style => setBackgroundImage(style)),
            30000
        );

        return () => clearInterval(interval);
    }, [getBackground])

    return (
        <div className="login-box">
            <form className="login-form" onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="email">
                    <i className="fas fa-envelope-open"></i>
                    <input type="text" placeholder="Email" autoComplete="new-email"
                           onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="password">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Password"
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <button>Login</button>
                <p>Don't have an account? <Link to="/signup">SIGN UP</Link></p>
            </form>
            <div className="image-aside" style={backgroundImage}>
                    <h1>Welcome Back!</h1>
                    <hr/>
            </div>
        </div>
    );
}