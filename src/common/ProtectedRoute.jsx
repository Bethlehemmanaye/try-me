import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthUserContext } from "pages/Session";

const ProtectedRoute = ({ path, component: Component, ...rest }) => {
  const authUser = useContext(AuthUserContext);
  return (
    <Route
      exact
      path={path}
      render={(props) => {
        if (!authUser || !authUser.isAuthor)
          return (
            <Redirect
              to={{ pathname: "/", state: { from: props.location } }}
            ></Redirect>
          );
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
