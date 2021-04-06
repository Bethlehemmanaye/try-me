import Joi from "joi-browser";
import React from "react";
import { Card, CardBody, CardFooter, Col, Form, Row } from "reactstrap";
import ParentForm from "../../common/form";
import { getCategories } from "services/categoryService";

class FoodsForm extends ParentForm {
  constructor(props) {
    super(props);
    this.initialState = {
      data: {
        title: "",
        image: "",
        description: "",
        ingredients: "",
        delivery_expectancy: "",
        categoryId: "",
        restaurantId: this.props.options.selectedRestaurant._id
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
      image: Joi.any()
        .allow("")
        .optional(),
      description: Joi.string()
        .allow("")
        .optional(),
      ingredients: Joi.string(),
      delivery_expectancy: Joi.string()
        .allow("")
        .optional(),
      categoryId: Joi.string().required(),
      restaurantId: Joi.string().required()
    };
  }

  populateState(data) {
    const updatedState = {
      ...this.state,
      data: {
        _id: data._id ? data._id : "",
        title: data.title,
        image: data.image,
        description: data.description,
        ingredients: data.ingredients,
        delivery_expectancy: data.delivery_expectancy,
        categoryId: data.category._id,
        restaurantId: data.restaurant._id
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

  handleImageDrop = image => {
    console.log(image[0].preview, "fasil");
    this.setState({ preview: image[0].preview });
  };

  render() {
    const { categories } = this.props.options;
    return (
      <Card className="border-0 bg-background">
        <CardBody className="bg-background ">
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col align="center" md={12} xs={12} sm={12}>
                {this.renderFileUploader("image", "Food Images")}
              </Col>
              <Col md={4} sm={12} xs={12}>
                {this.renderInput({
                  name: "title",
                  label: "Title"
                })}
              </Col>
              <Col md={4} sm={12} xs={12}>
                {this.renderInput({
                  name: "description",
                  label: "Description (optional)",
                  type: "textarea"
                })}
              </Col>
              <Col md={4} sm={12} xs={12}>
                {this.renderInput({
                  name: "ingredients",
                  label: "Ingredients (optional)",
                  type: "textarea"
                })}
              </Col>

              <Col md={6} sm={6} xs={12}>
                {this.renderInput({
                  name: "delivery_expectancy",
                  label: "Delivery Expectancy Time"
                })}
              </Col>
              <Col md={6} sm={6} xs={12}>
                {this.renderSelect({
                  name: "categoryId",
                  label: "Category",
                  options: categories,
                  optionsFrom: "server"
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
