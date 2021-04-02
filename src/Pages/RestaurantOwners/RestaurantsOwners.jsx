import CommonModals from "common/CommonModal";
import { initialState, reducer, _toggle } from "common/ModalOptions";
import CustomTable from "common/table";
import React, { useEffect, useReducer } from "react";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Button, Card, Col, Row } from "reactstrap";
import RestaurantOwnersForm from "./RestaurantOwnersForm";

const RestaurantOwnersManagement = ({
  restaurantOwners,
  doneAdd,
  doneEdit,
  addRestaurantOwner,
  editRestaurantOwner,
  deleteRestaurantOwner,
  doneDelete,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "name", label: "Name" },
    { path: "email", label: "Email" },
    { path: "phone_number", label: "Phone Number" },
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
                  title: "View Restaurant Owners",
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
                  submit: editRestaurantOwner,
                  data: restaurantOwners,
                  title: "Edit Restaurant Owners",
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
    deleteRestaurantOwner(id);
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
                Component: RestaurantOwnersForm,
                submit: addRestaurantOwner,
                title: "New Restaurant Owners",
                size: "md",
              },
              dispatch
            )
          }
          size="sm"
        >
          Add New Restaurant Owner
        </Button>
      </Col>
      <CustomTable
        title="Restaurant Owners"
        columns={columns}
        data={restaurantOwners}
      />
    </Card>
  );
};

export default RestaurantOwnersManagement;
