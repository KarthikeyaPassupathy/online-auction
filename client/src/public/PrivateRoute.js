import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token")) {
          if (jwt_decode(localStorage.getItem("token")).role === "admin") {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/userhomepage",
                  state: { from: props.location },
                }}
              />
            );
          }
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}

export default PrivateRoute;
