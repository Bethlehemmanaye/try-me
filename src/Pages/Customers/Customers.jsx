import CommonModals from "common/CommonModal";
import { initialState, reducer, _toggle } from "common/ModalOptions";
import CustomTable from "common/table";
import React, { useEffect, useReducer } from "react";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Button, Card, Col, Row } from "reactstrap";
import CustomersForm from "./CustomersForm";

const Customers = ({
  customers,
  doneAdd,
  doneEdit,
  addCustomer,
  editCustomer,
  deleteCustomer,
  doneDelete,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "name", label: "Name" },
    { path: "email", label: "Email" },
    { path: "password", label: "Password" },
    { path: "phone_number", label: "Phone Number" },
    {
      key: "view",
      label: "Actions",
      content: (customers) => (
        <Row>
          <Button
            className="buttons"
            size="sm"
            color="blue"
            onClick={() => {
              _toggle(
                {
                  type: "VIEW",
                  Component: CustomersForm,
                  data: customers,
                  title: "View Customers",
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
                  Component: CustomersForm,
                  submit: editCustomer,
                  data: customers,
                  title: "Edit Customers",
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
                    id: customers._id,
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
    deleteCustomer(id);
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
                Component: CustomersForm,
                submit: addCustomer,
                title: "New Customers",
                size: "md",
              },
              dispatch
            )
          }
          size="sm"
        >
          Add New Customer
        </Button>
      </Col>
      <CustomTable title="Customers" columns={columns} data={customers} />
    </Card>
  );
};

export default Customers;
