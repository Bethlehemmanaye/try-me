import React, { useContext } from "react";
import {
  MdGetApp,
  MdPeople,
  MdRestaurant,
  MdRestaurantMenu
} from "react-icons/md";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardSubtitle, Col, Row } from "reactstrap";
import routes from "../../config/routes";
import { AuthUserContext } from "pages/Session";

const Sections = [
  {
    label: "Restaurant Owners List",
    icon: <MdRestaurant color="text-primary" size={80} />,
    route: routes.restaurantOwners,
    isAdmin: true,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quos reprehenderit ipsa suscipit nemo! Voluptatum a libero quaerat ipsa nulla in doloremque accusantium id eius, ea placeat perspiciatis fugiat praesentium."
  },
  {
    label: "Cateogries",
    icon: <MdRestaurant color="text-primary" size={80} />,
    route: routes.categories,
    isAdmin: true,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quos reprehenderit ipsa suscipit nemo! Voluptatum a libero quaerat ipsa nulla in doloremque accusantium id eius, ea placeat perspiciatis fugiat praesentium."
  },
  {
    label: "Users",
    icon: <MdRestaurant color="text-primary" size={80} />,
    route: routes.users,
    isAdmin: true,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quos reprehenderit ipsa suscipit nemo! Voluptatum a libero quaerat ipsa nulla in doloremque accusantium id eius, ea placeat perspiciatis fugiat praesentium."
  },
  {
    label: "Restaurants",
    icon: <MdRestaurantMenu color="text-primary" size={80} />,
    route: routes.restaurants,
    isRestaurantOwner: true,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quos reprehenderit ipsa suscipit nemo! Voluptatum a libero quaerat ipsa nulla in doloremque accusantium id eius, ea placeat perspiciatis fugiat praesentium."
  }
];

const HomePage = () => {
  const authUser = useContext(AuthUserContext);

  return (
    <div className="homePageContainer">
      <CardHeader className="header">
        <h3>Welcome To Restaurant Management System</h3>
      </CardHeader>
      <Row>
        {authUser &&
          authUser.isAdmin &&
          Sections.filter(section => section.isAdmin === true).map(
            (section, index) => (
              <Col index={index} md={4} sm={6} xs={12}>
                <Link
                  to={{ pathname: section.route }}
                  style={{
                    textDecoration: "none"
                  }}
                >
                  <Card className="card">
                    {section.icon}
                    <div>
                      <CardHeader>{section.label}</CardHeader>
                      <CardSubtitle className="mt-3 text-dark">
                        {section.description}
                      </CardSubtitle>
                    </div>
                  </Card>
                </Link>
              </Col>
            )
          )}
        {authUser &&
          authUser.isRestaurantOwner &&
          Sections.filter(section => section.isRestaurantOwner === true).map(
            (section, index) => (
              <Col index={index} md={4} sm={6} xs={12}>
                <Link
                  to={{ pathname: section.route }}
                  style={{
                    textDecoration: "none"
                  }}
                >
                  <Card className="card">
                    {section.icon}
                    <div>
                      <CardHeader>{section.label}</CardHeader>
                      <CardSubtitle className="mt-3 text-dark">
                        {section.description}
                      </CardSubtitle>
                    </div>
                  </Card>
                </Link>
              </Col>
            )
          )}
      </Row>
    </div>
  );
};

export default HomePage;
