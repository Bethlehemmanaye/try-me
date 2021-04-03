import CommonModals from "common/CommonModal";
import { initialState, reducer, _toggle } from "common/ModalOptions";
import CustomTable from "common/table";
import React, { useEffect, useReducer } from "react";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Button, Card, Col, Row } from "reactstrap";
import RestaurantForm from "./RestaurantsForm";

const RestaurantManagement = ({
  restaurants,
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
    { path: "location", label: "Name" },
    { path: "description", label: "Description" },
    { path: "owner", label: "Owner Name" },

    {
      key: "view",
      label: "Actions",
      content: (restaurants) => (
        <Row>
          <Button
            className="buttons"
            size="sm"
            color="blue"
            onClick={() => {
              _toggle(
                {
                  type: "VIEW",
                  Component: RestaurantForm,
                  data: restaurants,
                  title: "View Restaurant",
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
              <b>'Name'</b>
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
                  Component: RestaurantForm,
                  submit: editRestaurant,
                  data: restaurants,
                  title: "Edit Restaurant",
                },
                dispatch
              );
            }}
          >
            <icon>
              <MdEdit />
            </icon>
            <small>
              <b>'Name'</b>
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
                    id: restaurants._id,
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
    <Card className="mt-2 p-2 backgroundd">
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
                Component: RestaurantForm,
                submit: addRestaurant,
                title: "New Restaurant",
                size: "md",
              },
              dispatch
            )
          }
          size="sm"
        >
          Add New Restaurant
        </Button>
      </Col>
      <CustomTable title="Restaurants" columns={columns} data={restaurants} />
    </Card>
  );
};

export default RestaurantManagement;
