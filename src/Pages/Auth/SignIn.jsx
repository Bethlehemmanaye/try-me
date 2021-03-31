import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormGroup,
  Input,
  Label,
  Col,
} from "reactstrap";
import routes from "../../config/routes";
import { MdHome } from "react-icons/md";

const SignIn = () => {
  return (
    <div className="authContainer">
      <Card className="authCard">
        <Link to={{ pathname: routes.homePage }}>
          <MdHome size={20} /> <small>Back to Home</small>
        </Link>
        <CardHeader align="center">
          <h1>Sign In</h1>
        </CardHeader>
        <CardBody>
          <FormGroup>
            <Label>Email</Label>
            <Input placeholder="Email" />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input placeholder="Password" />
          </FormGroup>
        </CardBody>
        <CardFooter align="center">
          <Link to={{ pathname: routes.homePage }}>
            <Button outline>Sign In</Button>
          </Link>
        </CardFooter>
        <Col align="right">
          <Link to={{ pathname: routes.signUp }}>
            <small>Don't have an Account?</small>
          </Link>
        </Col>
      </Card>
    </div>
  );
};
export default SignIn;
