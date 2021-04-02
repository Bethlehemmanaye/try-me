import CommonModals from "common/CommonModal";
import { initialState, reducer, _toggle } from "common/ModalOptions";
import CustomTable from "common/table";
import React, { useEffect, useReducer } from "react";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Button, Card, Col, Row } from "reactstrap";
import FeedbacksForm from "./FeedbacksForm";

const Feedbacks = ({
  feedbacks,
  doneAdd,
  doneEdit,
  addFeedback,
  editFeedback,
  deleteFeedback,
  doneDelete,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "customer", label: "Customer Name" },
    { path: "restaurant", label: "Restaurant" },
    { path: "content", label: "Content" },
    {
      key: "view",
      label: "Actions",
      content: (feedbacks) => (
        <Row>
          <Button
            className="buttons"
            size="sm"
            color="blue"
            onClick={() => {
              _toggle(
                {
                  type: "VIEW",
                  Component: FeedbacksForm,
                  data: feedbacks,
                  title: "View Feedbacks",
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
                  Component: FeedbacksForm,
                  submit: editFeedback,
                  data: feedbacks,
                  title: "Edit Feedbacks",
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
                    id: feedbacks._id,
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
              <b>Delete</b>
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
    deleteFeedback(id);
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
                Component: FeedbacksForm,
                submit: addFeedback,
                title: "New Feedbacks",
                size: "md",
              },
              dispatch
            )
          }
          size="sm"
        >
          Add New Feedback
        </Button>
      </Col>
      <CustomTable title="Feedbacks" columns={columns} data={feedbacks} />
    </Card>
  );
};

export default Feedbacks;
