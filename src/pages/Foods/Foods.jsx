import CommonModals from "common/CommonModal";
import { initialState, reducer, _toggle } from "common/ModalOptions";
import CustomTable from "common/table";
import React, { useEffect, useReducer } from "react";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Button, Card, Col, Row } from "reactstrap";
import FoodsForm from "./FoodsForm";

const Foods = ({
  foods,
  doneAdd,
  doneEdit,
  addFood,
  editFood,
  deleteFood,
  doneDelete,
  options
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "title", label: "Title" },
    { path: "delivery_expectancy", label: "Delivery Expectancy" },
    { path: "category.name", label: "Category" },
    {
      key: "view",
      label: "Actions",
      content: foods => (
        <Row>
          <Button
            className="buttons"
            size="sm"
            color="blue"
            onClick={() => {
              _toggle(
                {
                  type: "VIEW",
                  Component: FoodsForm,
                  data: foods,
                  title: "View Foods",
                  options
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
                  Component: FoodsForm,
                  submit: editFood,
                  data: foods,
                  title: "Edit Foods",
                  options
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
                    id: foods._id,
                    message: ""
                  }
                },
                dispatch
              );
            }}
          >
            <icon>
              <MdDelete />
            </icon>
            <small>
              <b>Delete</b>
            </small>
          </Button>
        </Row>
      )
    }
  ];

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  const okDelete = id => {
    deleteFood(id);
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
                Component: FoodsForm,
                submit: addFood,
                title: "New Foods",
                size: "md",
                options
              },
              dispatch
            )
          }
          size="sm"
        >
          Add New Food
        </Button>
      </Col>
      <CustomTable title="Foods" columns={columns} data={foods} />
    </Card>
  );
};

export default Foods;
