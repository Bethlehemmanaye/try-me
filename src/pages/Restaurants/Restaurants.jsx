import React from "react";
import { Row, Col, Card, CardHeader, CardSubtitle } from "reactstrap";
import {
  MdGetApp,
  MdList,
  MdPeople,
  MdRestaurant,
  MdRestaurantMenu,
  MdStar
} from "react-icons/md";
import routes from "../../config/routes";
import { Link } from "react-router-dom";

const Restaurant = ({ restaurants }) => {
  return (
    <div className="homePageContainer">
      <CardHeader className="header">
        <h3>Your Restaurants</h3>
      </CardHeader>
      <Row>
        {restaurants.map((restaurant, index) => (
          <Col index={index} md={4} sm={6} xs={12}>
            <Link
              to={`/singleRestaurants/${restaurant._id}`}
              style={{
                textDecoration: "none"
              }}
            >
              <Card className="card">
                <MdGetApp size={80} />
                <div>
                  <CardHeader>{restaurant.title}</CardHeader>
                  <CardSubtitle className="mt-3 text-dark">
                    {restaurant.description}
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

export default Restaurant;
