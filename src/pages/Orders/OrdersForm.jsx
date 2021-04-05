import Joi from "joi-browser";
import React from "react";
import { Card, CardBody, CardFooter, Col, Form, Row } from "reactstrap";
import ParentForm from "../../common/form";

class UserAdd extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        status: "open",
        quantity: "",
        remarks: "",
        foodId: "",
        customerName: "",
        customerId: this.props.options.authUser._id
      },
      errors: {}
    };
    this.state = this.initialState;
    this.schema = {
      _id: Joi.string()
        .allow("")
        .optional(),
      status: Joi.string()
        .valid([
          "open",
          "closed",
          "order accepted",
          "out for delivery",
          "deliverd"
        ])
        .allow("")
        .optional(),
      quantity: Joi.number()
        .allow("")
        .optional(),
      remarks: Joi.string()
        .allow("")
        .optional(),
      customerName: Joi.string()
        .allow("")
        .optional(),
      foodId: Joi.string().required(),
      customerId: Joi.string().required()
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        _id: data._id ? data._id : "",
        status: data.status,
        quantity: data.quantity,
        remarks: data.remarks,
        foodId: data.food._id,
        customerId: data.customer._id,
        customerName: data.customer.first_name + " " + data.customer.last_name
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
    const body = { ...data };
    delete body.customerName;
    this.props.submit(body);
  }

  render() {
    const { foods } = this.props.options;
    const { isView } = this.props;
    return (
      <Card className="border-0 bg-background">
        <CardBody className="bg-background ">
          <Form onSubmit={this.handleSubmit}>
            <Row>
              {isView && (
                <Col md={4} sm={6} xs={12}>
                  {this.renderSelect({
                    name: "status",
                    label: "Status",
                    options: [
                      "open",
                      "closed",
                      "order accepted",
                      "out for delivery",
                      "deliverd"
                    ]
                  })}
                </Col>
              )}
              {isView && (
                <Col md={4} sm={6} xs={12}>
                  {this.renderInput({
                    name: "customerName",
                    label: "Customer"
                  })}
                </Col>
              )}

              <Col md={4} sm={6} xs={12}>
                {this.renderSelect({
                  name: "foodId",
                  label: "Food Name",
                  options: foods.map(food => ({
                    name: food.title,
                    _id: food._id
                  })),
                  optionsFrom: "server"
                })}
              </Col>
              <Col md={4} sm={6} xs={12}>
                {this.renderInput({
                  name: "quantity",
                  label: "Quantity",
                  type: "number"
                })}
              </Col>
              <Col md={12} sm={12} xs={12}>
                {this.renderInput({
                  name: "remarks",
                  label: "Remarks",
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
