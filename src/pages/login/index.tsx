import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function LoginPage(){
    let [backgroundImage, setBackgroundImage] = useState({} as React.CSSProperties);
    let [index, setIndex] = useState(0);
       
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
            <form className="login-form">
                <h1>Login</h1>
                <div className="email">
                    <i className="fas fa-envelope-open"></i>
                    <input type="text" placeholder="Email" autoComplete="new-email"/>
                </div>
                <div className="password">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Password"/>
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