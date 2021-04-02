import React from "react";
import { Row, Col, Card, CardHeader, CardSubtitle } from "reactstrap";
import {
  MdDoneAll,
  MdGetApp,
  MdList,
  MdPeople,
  MdRestaurant,
  MdRestaurantMenu,
  MdStar,
} from "react-icons/md";
import routes from "../../config/routes";
import { Link } from "react-router-dom";

const Sections = [
  {
    label: "Restaurant Owners List",
    icon: <MdRestaurant color="text-primary" size={80} />,
    route: routes.restaurantOwners,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quos reprehenderit ipsa suscipit nemo! Voluptatum a libero quaerat ipsa nulla in doloremque accusantium id eius, ea placeat perspiciatis fugiat praesentium.",
  },
  {
    label: "Customers",
    icon: <MdPeople color="text-primary" size={80} />,
    route: routes.customers,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quos reprehenderit ipsa suscipit nemo! Voluptatum a libero quaerat ipsa nulla in doloremque accusantium id eius, ea placeat perspiciatis fugiat praesentium.",
  },
  {
    label: "Restaurants",
    icon: <MdRestaurantMenu color="text-primary" size={80} />,
    route: routes.restaurants,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quos reprehenderit ipsa suscipit nemo! Voluptatum a libero quaerat ipsa nulla in doloremque accusantium id eius, ea placeat perspiciatis fugiat praesentium.",
  },
  {
    label: "Foods",
    icon: <MdGetApp color="text-primary" size={80} />,
    route: routes.foods,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quos reprehenderit ipsa suscipit nemo! Voluptatum a libero quaerat ipsa nulla in doloremque accusantium id eius, ea placeat perspiciatis fugiat praesentium.",
  },
  {
    label: "Orders",
    icon: <MdList color="text-primary" size={80} />,
    route: routes.orders,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quos reprehenderit ipsa suscipit nemo! Voluptatum a libero quaerat ipsa nulla in doloremque accusantium id eius, ea placeat perspiciatis fugiat praesentium.",
  },
  {
    label: "Ratings",
    icon: <MdStar color="text-primary" size={80} />,
    route: routes.signUp,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quos reprehenderit ipsa suscipit nemo! Voluptatum a libero quaerat ipsa nulla in doloremque accusantium id eius, ea placeat perspiciatis fugiat praesentium.",
  },
  {
    label: "Completed Orders",
    icon: <MdDoneAll color="text-primary" size={80} />,
    route: routes.signUp,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quos reprehenderit ipsa suscipit nemo! Voluptatum a libero quaerat ipsa nulla in doloremque accusantium id eius, ea placeat perspiciatis fugiat praesentium.",
  },
];

const HomePage = () => {
  return (
    <div className="homePageContainer">
      <CardHeader className="bg-background text-primary">
        <h3>Welcome To Restaurant Management System</h3>
      </CardHeader>
      <Row>
        {Sections.map((section, index) => (
          <Col index={index} md={4} sm={6} xs={12}>
            <Link
              to={{ pathname: section.route }}
              style={{
                textDecoration: "none",
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
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
