import React from "react";
import { MdHome } from "react-icons/md";
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
import Logo from "../../assets/Logo/Logo_Primary.png";

const SignUp = () => {
  return (
    <div className="authContainer">
      <Card className="authCard">
        <Link to={{ pathname: routes.homePage }}>
          <MdHome size={20} /> <small>Back to Home</small>
        </Link>
        <CardHeader align="center">
          <img height="50" width="50" alt="" src={Logo} />
          <h5>Sign Up</h5>
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
