import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import firebase from "firebase";
import app from "../../services/firebase";
import "./index.css";
import swal from "sweetalert";

export default function SignUpPage(){
    const userContext = useContext(AuthContext);
    const history = useHistory();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [backgroundImage, setBackgroundImage] = useState({} as React.CSSProperties);
    let [index, setIndex] = useState(0);
    
    function handleSignup(event: React.FormEvent){
        event.preventDefault();

        
        app.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential: firebase.auth.UserCredential) => {
            userContext.setUser(userCredential);
            const database = firebase.firestore();
            database.collection("Users").doc(userCredential.user!.uid)
            .set({
                email,
                password
            }).then(async () => {
                swal({
                    title: "Successefuly registered",
                    text: "Redirecting to the Login page in 5 seconds",
                    icon: "Success"
                })
                await new Promise(resolve => setTimeout(resolve, 4000));
                history.push("/");
            }).catch(error => {
                swal({
                    title: error.code,
                    text: error.message,
                    icon: "Error"
                })
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
            <form className="login-form" onSubmit={handleSignup}>
                <h1>SignUp</h1>
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
                <button>Signup</button>
                <p>Already Have an account? <Link to="/">LOGIN</Link></p>
            </form>
            <div className="image-aside" style={backgroundImage}>
                    <h1>Welcome Back!</h1>
                    <hr/>
            </div>
        </div>
    );
}