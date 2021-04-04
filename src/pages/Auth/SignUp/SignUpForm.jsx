import React, { Component } from "react";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
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
import routes from "config/routes";
import Logo from "assets/Logo/Logo_Primary.png";
import ParentForm from "common/form";

export default class SignUpForm extends ParentForm {
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
      first_name: Joi.string()
        .min(3)
        .max(50)
        .required(),
      last_name: Joi.string()
        .min(3)
        .max(50)
        .required(),
      email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
      password: Joi.string()
        .min(5)
        .max(255)
        .required(),
      phone_number: Joi.string()
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
              <h5>Sign Up</h5>
            </CardHeader>
            <CardBody>
              {this.renderInput("first_name", "First Name")}
              {this.renderInput("last_name", "Last Name")}
              {this.renderInput("email", "Email")}
              {this.renderInput("phone_number", "Phone Number")}
              {this.renderInput("password", "Password", "password")}
            </CardBody>
            <CardFooter align="center">
              {this.renderButton("Sign Up")}
            </CardFooter>
            <Col align="right">
              <Link to={{ pathname: routes.signIn }}>
                <small>Already have an Account?</small>
              </Link>
            </Col>
          </Card>
        </div>
      </Form>
    );
  }
}
