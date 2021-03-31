import CommonModals from "Components/CommonModal";
import { initialState, reducer, _toggle } from "Pages/common/ModalOptions";
import CustomTable from "Pages/common/table";
import React, { useEffect, useReducer } from "react";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import Translate from "react-translate-component";
import { Button, Card, Col, Row } from "reactstrap";
import CategoryAdd from "./RestaurantsForm";

const CategoryManagement = ({
  categorys,
  doneAdd,
  doneEdit,
  addCategory,
  editCategory,
  deleteCategory,
  doneDelete,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "name", label: <Translate content="categories" /> },
    { path: "created_at", label: <Translate content="dateCreated" /> },
    {
      key: "view",
      label: <Translate content="actions" />,
      content: (categorys) => (
        <Row>
          <Button
            className="buttons"
            size="sm"
            color="blue"
            onClick={() => {
              _toggle(
                {
                  type: "VIEW",
                  Component: CategoryAdd,
                  data: categorys,
                  title: "View Category",
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
              <b>
                <Translate content="view" />
              </b>
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
                  Component: CategoryAdd,
                  submit: editCategory,
                  data: categorys,
                  title: "Edit Category",
                },
                dispatch
              );
            }}
          >
            <icon>
              <MdEdit />
            </icon>
            <small>
              <b>
                <Translate content="edit" />
              </b>
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
              <b>
                <Translate content="delete" />
              </b>
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
    deleteCategory(id);
  };
  return (
    <Card className="profileNews bg-primary mt-2 p-2 border-0">
      <CommonModals
        size="sm"
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
                Component: CategoryAdd,
                submit: addCategory,
                title: "New Category",
              },
              dispatch
            )
          }
          size="sm"
        >
          <Translate content="addCategory" />
        </Button>
      </Col>
      <CustomTable title="Categories" columns={columns} data={categorys} />
    </Card>
  );
};

export default CategoryManagement;
