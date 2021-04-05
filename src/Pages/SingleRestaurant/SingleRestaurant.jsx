import classnames from "classnames";
import Feedbacks from "pages/Feedbacks/Feedbacks";
import Foods from "pages/Foods/Foods";
import OrdersManagement from "pages/Orders/";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImg,
  Col,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import Image from "../../assets/Nunu.jpg";
import RestaurantForm from "./RestaurantsForm";
const SingleRestaurants = ({
  restaurants,
  selectedRestaurant,
  editRestaurant,
  doneEdit
}) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div className="singleRestaurantContainer">
      <Card className="singleItemCard">
        <Row>
          <Col md={6} xs={12} sm={12}>
            <CardImg src={selectedRestaurant && selectedRestaurant.image} />
          </Col>
          <Col md={6} xs={12} sm={12}>
            <CardHeader className="header">
              {selectedRestaurant && selectedRestaurant.title}
            </CardHeader>
            <CardBody>
              <RestaurantForm
                data={selectedRestaurant}
                submit={editRestaurant}
              />
            </CardBody>
          </Col>
        </Row>
        <hr />
        <div className="mt-2 p-2">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames(
                  { active: activeTab === "1" },
                  "ActiveTab text-primary"
                )}
                onClick={() => {
                  toggle("1");
                }}
              >
                Orders
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames(
                  { active: activeTab === "2" },
                  "ActiveTab text-primary"
                )}
                onClick={() => {
                  toggle("2");
                }}
              >
                Foods
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames(
                  { active: activeTab === "3" },
                  "ActiveTab text-primary"
                )}
                onClick={() => {
                  toggle("3");
                }}
              >
                Feedbacks
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              {activeTab === "1" ? (
                <OrdersManagement selectedRestaurant={selectedRestaurant} />
              ) : null}
            </TabPane>
            <TabPane tabId="2" selectedRestaurant={selectedRestaurant}>
              {activeTab === "2" ? <Foods /> : null}
            </TabPane>
            <TabPane tabId="3" selectedRestaurant={selectedRestaurant}>
              {activeTab === "3" ? <Feedbacks /> : null}
            </TabPane>
          </TabContent>
        </div>
      </Card>
    </div>
  );
};
export default SingleRestaurants;
