import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

const PrivateRoute = ({Component, ...rest}: any) => {
	const {authenticated, loadingAuthState} = useContext(AuthContext);
	console.log(authenticated);
	if (loadingAuthState) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	}

	if (!authenticated)
		return  <Redirect to="/"/>
	return (
		<Route {...rest} render={props => { <Component {...props}/>}}/>
	);
}

export default PrivateRoute