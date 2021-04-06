import Joi from "joi-browser";
import React from "react";
import { Card, CardBody, CardFooter, Col, Form, Row } from "reactstrap";
import ParentForm from "../../common/form";

class FeedbackForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        content: "",
        restaurantId: this.props.options.selectedRestaurant._id,
        customerId: this.props.options.authUser._id
      },
      errors: {}
    };
    this.state = this.initialState;
    this.schema = {
      _id: Joi.string()
        .allow("")
        .optional(),
      content: Joi.string()
        .min(5)
        .required(),
      restaurantId: Joi.string().required(),
      customerId: Joi.string().required()
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        _id: data._id ? data._id : "",
        content: data.content,
        restaurantId: data.restaurant._id,
        customerId: data.customer._id
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
              <Col md={12} sm={12} xs={12}>
                {this.renderInput({
                  name: "content",
                  label: "Content",
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
export default FeedbackForm;
