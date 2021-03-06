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
import { withAuthentication } from "pages/Session";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const Categories = React.lazy(() => import("./pages/Categories"));
const Users = React.lazy(() => import("./pages/Users"));
const Restaurants = React.lazy(() => import("./pages/Restaurants"));
const RestaurantOwners = React.lazy(() => import("./pages/RestaurantOwners"));
const Foods = React.lazy(() => import("./pages/Foods"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Feedbacks = React.lazy(() => import("./pages/Feedbacks"));
const SingleRestaurants = React.lazy(() => import("./pages/SingleRestaurant"));

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
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
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
                <Route exact path={routes.categories} component={Categories} />
                <Route exact path={routes.users} component={Users} />

                <Route
                  exact
                  path={routes.restaurantOwners}
                  component={RestaurantOwners}
                />
                <Route exact path={routes.foods} component={Foods} />
                <Route exact path={routes.customers} component={Customers} />
                <Route exact path={routes.orders} component={Orders} />
                <Route exact path={routes.feedbacks} component={Feedbacks} />
                <Route
                  exact
                  path={routes.singleRestaurants}
                  component={SingleRestaurants}
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

export default withAuthentication(App);
