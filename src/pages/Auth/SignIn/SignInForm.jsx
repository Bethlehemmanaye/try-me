import React, { Component } from "react";
import ParentForm from "common/form";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormGroup,
  Input,
  Form,
  Label,
  Col
} from "reactstrap";
import Joi from "joi-browser";
import routes from "config/routes";
import { MdHome } from "react-icons/md";
import Logo from "assets/Logo/Logo_Primary.png";

export default class SignInForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        email: "",
        password: ""
      },
      errors: {}
    };
    this.state = this.initialState;
    this.schema = {
      email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
      password: Joi.string()
        .min(5)
        .max(255)
        .required()
    };
  }

  doSubmit() {
    const { data } = this.state;
    this.props.submit(data);
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
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
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password", "password")}
            </CardBody>
            <CardFooter align="center">
              {/* <Link to={{ pathname: routes.homePage }}>
                <Button outline>Sign In</Button>
              </Link> */}
              {this.renderButton("Sign In")}
            </CardFooter>
            <Col align="right">
              <Link to={{ pathname: routes.signUp }}>
                <small>Don't have an Account?</small>
              </Link>
            </Col>
          </Card>
        </div>
      </Form>
    );
  }
}
