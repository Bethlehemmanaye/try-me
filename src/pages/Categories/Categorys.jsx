import CommonModals from "common/CommonModal";
import { initialState, reducer, _toggle } from "common/ModalOptions";
import CustomTable from "common/table";
import React, { useEffect, useReducer } from "react";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Button, Card, Col, Row } from "reactstrap";
import CategorysForm from "./CategoryForm";

const Categorys = ({
  categorys,
  doneAdd,
  doneEdit,
  addCategory,
  editCategory,
  deleteCategory,
  doneDelete,
  options
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "name", label: "Name" },
    { path: "subtitle", label: "Subtitle" },
    {
      key: "view",
      label: "Actions",
      content: categorys => (
        <Row>
          <Button
            className="buttons"
            size="sm"
            color="blue"
            onClick={() => {
              _toggle(
                {
                  type: "VIEW",
                  Component: CategorysForm,
                  data: categorys,
                  title: "View Categorys",
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
                  Component: CategorysForm,
                  submit: editCategory,
                  data: categorys,
                  title: "Edit Categorys",
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
                    id: categorys._id,
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
    deleteCategory(id);
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
                Component: CategorysForm,
                submit: addCategory,
                title: "New Categorys",
                size: "md",
                options
              },
              dispatch
            )
          }
          size="sm"
        >
          Add New Category
        </Button>
      </Col>
      <CustomTable title="Categorys" columns={columns} data={categorys} />
    </Card>
  );
};

export default Categorys;
