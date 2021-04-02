import Joi from "joi-browser";
import React from "react";
import { Card, CardBody, CardFooter, Col, Form, Row } from "reactstrap";
import ParentForm from "../../common/form";

class FeedbackForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        name: "",
      },
      errors: {},
    };
    this.state = this.initialState;
    this.schema = {
      _id: Joi.string().allow("").optional(),
      name: Joi.string(),
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        _id: data._id ? data._id : "",
        name: data.name,
      },
      lockUpdate: true,
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
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "customer",
                  label: "Customer Name",
                  options: ["Customer One", "Customer Two"],
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "restaurant",
                  label: "Restaurant Name",
                  options: ["Restaurant One", "Restaurant Two"],
                })}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput({
                  name: "content",
                  label: "Content",
                  type: "textarea",
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
