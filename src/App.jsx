import React from "react";
import "react-animated-slider/build/horizontal.css";
import "./styles/projectTitle.scss";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Spinner } from "reactstrap";
import { EmptyLayout, LayoutRoute, MainLayout } from "./components/Layout";
import routes from "./config/routes";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import configureStore from "./store/configureStore";
import { load } from "./autoload";
import { ToastContainer, Zoom } from "react-toastify";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const Restaurants = React.lazy(() => import("./pages/Restaurants"));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split("/").pop()}`;
};

export const store = configureStore();
store.dispatch(load());

function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={100}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        transition={Zoom}
        rtl={false}
        pauseOnFocusLoss
        closeButton={false}
        draggable
        pauseOnHover
      />
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
                <Route exact path={routes.homePage} component={HomePage} />
                <Route
                  exact
                  path={routes.restaurants}
                  component={Restaurants}
                />
              </React.Suspense>
            </MainLayout>
          </React.Fragment>
          <Redirect to={routes.signUp} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
