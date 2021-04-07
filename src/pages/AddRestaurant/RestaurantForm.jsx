import Joi from "joi-browser";
import React from "react";
import { Card, CardBody, CardFooter, Col, Form, Row } from "reactstrap";
import ParentForm from "../../common/form";

class UserAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        title: "",
        location: "",
        description: "",
        contact_phone_number: "",
        user_id: this.props.options.authUser._id
      },
      errors: {}
    };
    this.state = this.initialState;
    this.schema = {
      _id: Joi.string()
        .allow("")
        .optional(),
      title: Joi.string()
        .min(5)
        .max(255)
        .required(),
      location: Joi.string()
        .min(5)
        .required(),
      description: Joi.string(),
      image: Joi.any(),
      contact_phone_number: Joi.string(),
      user_id: Joi.string().required()
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        _id: data._id ? data._id : "",
        title: data.title,
        location: data.location,
        description: data.description,
        contact_phone_number: data.contact_phone_number,
        image: data.image,
        user_id: data.owner._id
      },
      lockUpdate: true
    };
    this.setState(updatedState);
  }

  componentDidUpdate() {
    if ((this.props.isEdit || this.props.isView) && !this.state.lockUpdate) {
      this.populateState(this.props.data);
    }
  }
  componentDidMount() {
    this.componentDidUpdate();
  }

  doSubmit() {
    const { data } = this.state;

    this.props.submit(data);
  }

  render() {
    return (
      <Card className="border-0 bg-background">
        <CardBody className="bg-background ">
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col align="center" md={12} xs={12} sm={12}>
                {this.renderFileUploader("image", "Restaurant Image")}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "title",
                  label: "Name"
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "location",
                  label: "Location"
                })}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput({
                  name: "contact_phone_number",
                  label: "Contact Phone Number"
                })}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput({
                  name: "description",
                  label: "Description",
                  type: "textarea"
                })}
              </Col>
            </Row>

            <CardFooter className="bg-background" align="center">
              {this.renderButton("Save")}
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default UserAdd;
