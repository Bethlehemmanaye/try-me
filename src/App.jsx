import React from "react";
import "react-animated-slider/build/horizontal.css";
import "./styles/projectTitle.scss";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Spinner } from "reactstrap";
import { EmptyLayout, LayoutRoute, MainLayout } from "./components/Layout";
import routes from "./config/routes";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

const DemoPage = React.lazy(() => import("./pages/HomePage"));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split("/").pop()}`;
};

function App() {
  return (
    <BrowserRouter basename={getBasename()}>
      <Switch>
        <LayoutRoute
          exact
          path={routes.signUp}
          layout={EmptyLayout}
          component={SignUp}
        />
        <LayoutRoute
          exact
          path={routes.signIn}
          layout={EmptyLayout}
          component={SignIn}
        />
        <React.Fragment>
          <MainLayout>
            <React.Suspense
              fallback={
                <div className="spinnerContainer">
                  <Spinner color="secondary" />
                </div>
              }
            >
              <Route exact path={routes.homePage} component={DemoPage} />
            </React.Suspense>
          </MainLayout>
        </React.Fragment>
        <Redirect to={routes.signUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
