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
import Logo from "../../assets/Logo/Logo_Primary.png";

const SignIn = () => {
  return (
    <div className="authContainer">
      <Card className="authCard">
        <Link to={{ pathname: routes.homePage }}>
          <MdHome size={20} /> <small>Back to Home</small>
        </Link>
        <CardHeader align="center">
          <img height="50" width="50" alt="" src={Logo} />
          <h5>Sign In</h5>
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
