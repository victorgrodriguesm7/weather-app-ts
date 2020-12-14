import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

const PrivateRoute = ({ RouteComponent, ...rest}: any) => {
  const {authenticated, loadingAuthState} = useContext(AuthContext);
  if (loadingAuthState) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
      <Route
        {...rest}
        render={routeProps =>
        authenticated ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={{pathname: "/", state: {prevPath:  rest.path}}} />
        )
      }
      />
    );
  }
export default PrivateRoute