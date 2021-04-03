import classnames from "classnames";
import Feedbacks from "pages/Feedbacks/Feedbacks";
import Foods from "pages/Foods/Foods";
import OrdersManagement from "pages/Orders/Orders";
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
  TabPane,
} from "reactstrap";
import Image from "../../assets/Nunu.jpg";

const SingleRestaurants = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div className="singleRestaurantContainer">
      <Card className="singleItemCard">
        <Row>
          <Col md={6} xs={12} sm={12}>
            <CardImg src={Image} />
          </Col>
          <Col md={6} xs={12} sm={12}>
            <CardHeader className="header">
              Restaurant Name Goes Here
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={6} sm={12} xs={12}>
                  <Label>Name</Label>
                  <Input placeholder="Restaurant Name" />
                </Col>
                <Col md={6} sm={12} xs={12}>
                  <Label>Location</Label>
                  <Input placeholder="Location" />
                </Col>
                <Col className="mt-3" md={12} sm={12} xs={12}>
                  <Label>Description</Label>
                  <Input
                    type="textarea"
                    placeholder="Description about your Restaurant"
                  />
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="footer" align="center">
              <Button>Save</Button>
            </CardFooter>
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
              <OrdersManagement />
            </TabPane>
            <TabPane tabId="2">
              <Foods />
            </TabPane>
            <TabPane tabId="3">
              <Feedbacks />
            </TabPane>
          </TabContent>
        </div>
      </Card>
    </div>
  );
};
export default SingleRestaurants;
