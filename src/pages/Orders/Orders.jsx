import CommonModals from "common/CommonModal";
import { initialState, reducer, _toggle } from "common/ModalOptions";
import CustomTable from "common/table";
import React, { useEffect, useReducer } from "react";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Button, Card, Col, Row } from "reactstrap";
import OrdersForm from "./OrdersForm";
import statusTypes from "config/statusTypes";
import { IoIosSend } from "react-icons/io";

const Orders = ({
  orders,
  doneAdd,
  doneEdit,
  addOrder,
  editOrder,
  deleteOrder,
  doneDelete,
  options
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getOrderFormData = (order, status) => {
    return {
      _id: order._id,
      status,
      quantity: order.quantity,
      remarks: order.remarks,
      foodId: order.food._id,
      customerId: order.customer._id
    };
  };
  const columns = [
    { path: "status", label: "Status" },
    { path: "customer.name", label: "Customer" },
    { path: "food.title", label: "Food Name" },
    { path: "quantity", label: "Quantity" },
    { path: "remarks", label: "Remarks" },
    { path: "created_at", label: "Date" },
    {
      key: "view",
      label: "Actions",
      content: orders => (
        <Row>
          <Button
            className="buttons"
            size="sm"
            color="blue"
            onClick={() => {
              _toggle(
                {
                  type: "VIEW",
                  Component: OrdersForm,
                  data: orders,
                  title: "View Orders",
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
                  Component: OrdersForm,
                  submit: editOrder,
                  data: orders,
                  title: "Edit Orders",
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
                    id: orders._id,
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

          {orders.status === statusTypes.OPEN ? (
            <Button
              className="buttons"
              size="sm"
              color="success"
              onClick={() =>
                editOrder(getOrderFormData(orders, statusTypes.CLOSED))
              }
            >
              <icon>
                <IoIosSend />
              </icon>
              <small>
                <b>Close</b>
              </small>
            </Button>
          ) : (
            <></>
          )}
          {orders.status === statusTypes.OPEN ? (
            <Button
              className="buttons"
              size="sm"
              color="success"
              onClick={() =>
                editOrder(getOrderFormData(orders, statusTypes.ORDER_ACCEPTED))
              }
            >
              <icon>
                <IoIosSend />
              </icon>
              <small>
                <b>Accept</b>
              </small>
            </Button>
          ) : (
            <></>
          )}
          {orders.status === statusTypes.ORDER_ACCEPTED ? (
            <Button
              className="buttons"
              size="sm"
              color="success"
              onClick={() =>
                editOrder(
                  getOrderFormData(orders, statusTypes.OUT_FOR_DELIVERY)
                )
              }
            >
              <icon>
                <IoIosSend />
              </icon>
              <small>
                <b>Out For Delivery</b>
              </small>
            </Button>
          ) : (
            <></>
          )}
          {orders.status === statusTypes.OUT_FOR_DELIVERY ? (
            <Button
              className="buttons"
              size="sm"
              color="success"
              onClick={() =>
                editOrder(getOrderFormData(orders, statusTypes.DELIVERED))
              }
            >
              <icon>
                <IoIosSend />
              </icon>
              <small>
                <b>Deliver</b>
              </small>
            </Button>
          ) : (
            <></>
          )}
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
    deleteOrder(id);
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
                Component: OrdersForm,
                submit: addOrder,
                title: "New Orders",
                size: "md",
                options
              },
              dispatch
            )
          }
          size="sm"
        >
          Add New Order
        </Button>
      </Col>
      <CustomTable
        title="Orders"
        columns={columns}
        data={orders.map(order => ({
          ...order,
          customer: {
            ...order.customer,
            name: order.customer.first_name + " " + order.customer.last_name
          }
        }))}
      />
    </Card>
  );
};

export default Orders;
