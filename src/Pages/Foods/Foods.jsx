import CommonModals from "common/CommonModal";
import { initialState, reducer, _toggle } from "common/ModalOptions";
import CustomTable from "common/table";
import React, { useEffect, useReducer } from "react";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Button, Card, Col, Row } from "reactstrap";
import RestaurantOwnersForm from "./FoodsForm";

const RestaurantOwnersManagement = ({
  restaurantOwners,
  doneAdd,
  doneEdit,
  addRestaurant,
  editRestaurant,
  deleteRestaurant,
  doneDelete,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "title", label: "Name" },
    { path: "email", label: "Email" },
    { path: "description", label: "Description" },
    { path: "restaurant", label: "Restaurant" },
    { path: "category", label: "Category" },
    { path: "delivery_expectency", label: "Delivery Expectency Time" },
    {
      key: "view",
      label: "Actions",
      content: (restaurantOwners) => (
        <Row>
          <Button
            className="buttons"
            size="sm"
            color="blue"
            onClick={() => {
              _toggle(
                {
                  type: "VIEW",
                  Component: RestaurantOwnersForm,
                  data: restaurantOwners,
                  title: "View Foods",
                },
                dispatch
              );
            }}
          >
            <icon>
              {" "}
              <MdRemoveRedEye />
            </icon>
            <small>
              <b>View</b>
            </small>
          </Button>
          <Button
            className="buttons"
            size="sm"
            color="warning"
            onClick={() => {
              _toggle(
                {
                  type: "EDIT",
                  Component: RestaurantOwnersForm,
                  submit: editRestaurant,
                  data: restaurantOwners,
                  title: "Edit Foods",
                },
                dispatch
              );
            }}
          >
            <icon>
              <MdEdit />
            </icon>
            <small>
              <b>Edit</b>
            </small>
          </Button>
          <Button
            className="buttons"
            size="sm"
            color="danger"
            onClick={() => {
              _toggle(
                {
                  type: "DELETE",
                  deleteOptions: {
                    okCallback: okDelete,
                    title: "Are you sure?",
                    id: restaurantOwners._id,
                    message: "",
                  },
                },
                dispatch
              );
            }}
          >
            <icon>
              <MdDelete />
            </icon>
            <small>
              <b>'Name'</b>
            </small>
          </Button>
        </Row>
      ),
    },
  ];

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  const okDelete = (id) => {
    deleteRestaurant(id);
  };
  return (
    <Card className="mt-2 p-2 bg-background">
      <CommonModals
        size={state.size}
        data={state.data}
        openModal={state.openModal}
        component={state.Component}
        toggle={_toggle}
        dispatch={dispatch}
        title={state.title}
      />
      <Col align="right" className="newButton">
        <Button
          onClick={() =>
            _toggle(
              {
                type: "ADD",
                Component: RestaurantOwnersForm,
                submit: addRestaurant,
                title: "New Foods",
                size: "md",
              },
              dispatch
            )
          }
          size="sm"
        >
          Add New Food
        </Button>
      </Col>
      <CustomTable title="Foods" columns={columns} data={restaurantOwners} />
    </Card>
  );
};

export default RestaurantOwnersManagement;
