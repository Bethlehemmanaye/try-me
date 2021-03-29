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
import routes from "../../Config/routes";

const SignIn = () => {
  return (
    <div className="authContainer">
      <Card className="authCard">
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
