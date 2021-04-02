import Joi from "joi-browser";
import React from "react";
import { Card, CardBody, CardFooter, Col, Form, Row } from "reactstrap";
import ParentForm from "../../common/form";

class FoodsForm extends ParentForm {
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
              <Col md={12} sm={12} xs={12}>
                {/* {this.renderInput({
                  name: "phone_number",
                  label: "Phone Number",
                  type: "number",
                })} */}
                <h1>Image Uploader Goes Here</h1>
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput({
                  name: "title",
                  label: "Name",
                })}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput({
                  name: "description",
                  label: "Description",
                  type: "textarea",
                })}
              </Col>
              <Col md={12} sm={12} xs={12}>
                <h1>Ingridients Goes Here</h1>
              </Col>

              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "delivery_expectancy",
                  label: "Delivery Expectancy Time",
                  type: "time",
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "category",
                  label: "Category",
                  options: ["Category One", "Category Two"],
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
export default FoodsForm;
