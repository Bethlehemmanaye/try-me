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

const SignUp = () => {
  return (
    <div className="authContainer">
      <Card className="authCard">
        <CardHeader align="center">
          <h1>Sign Up</h1>
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
          <FormGroup>
            <Label>Confirm Password</Label>
            <Input placeholder="Confirm Password" />
          </FormGroup>
        </CardBody>
        <CardFooter align="center">
          <Button outline>Sign Up</Button>
        </CardFooter>
        <Col align="right">
          <Link to={{ pathname: routes.signIn }}>
            <small>Already have an Account?</small>
          </Link>
        </Col>
      </Card>
    </div>
  );
};
export default SignUp;
