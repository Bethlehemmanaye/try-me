import React from "react";
import { Route } from "react-router-dom";

const LayoutRoute = ({
  children,
  component: Component,
  layout: Layout,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        {children}
        <Component {...props} />
      </Layout>
    )}
  />
);

export default LayoutRoute;
