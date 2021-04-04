import Joi from "joi-browser";
import React from "react";
import { Card, CardBody, CardFooter, Col, Form, Row } from "reactstrap";
import ParentForm from "../../common/form";

class RestaurantForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        title: "",
        location: "",
        image: "",
        description: "",
        contact_phone_number: "",
        user_id: ""
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
      image: Joi.any()
        .allow("")
        .optional(),
      description: Joi.string(),
      contact_phone_number: Joi.string(),
      user_id: Joi.string().required()
    };
  }

  populateState(data) {
    if (data) {
      const updatedState = {
        ...this.state,
        data: {
          _id: data._id ? data._id : "",
          title: data.title,
          location: data.location,
          image: data.image,
          description: data.description,
          contact_phone_number: data.contact_phone_number,
          user_id: data.owner._id
        },
        lockUpdate: true
      };
      this.setState(updatedState);
    }
  }

  componentDidUpdate() {
    if (!this.state.lockUpdate) {
      this.populateState(this.props.data);
    }
  }
  componentDidMount() {
    this.componentDidUpdate();
  }

  doSubmit() {
    this.props.submit(this.state.data);
  }

  handleImageDrop = image => {
    console.log(image[0].preview, "fasil");
    this.setState({ preview: image[0].preview });
  };

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
                  label: "Title"
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
                  name: "description",
                  label: "Description",
                  type: "textarea"
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "contact_phone_number",
                  label: "Contact Phone Number"
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
export default RestaurantForm;
