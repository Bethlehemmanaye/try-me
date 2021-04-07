import CommonModals from "common/CommonModal";
import { initialState, reducer, _toggle } from "common/ModalOptions";
import CustomTable from "common/table";
import React, { useEffect, useReducer } from "react";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Button, Card, Col, Row } from "reactstrap";

const Users = ({
  users,
  doneAdd,
  doneEdit,
  addUser,
  editUser,
  deleteUser,
  doneDelete,
  options
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = [
    { path: "email", label: "Email" },
    { path: "isAdmin", label: "Is Admin" },
    { path: "isRestaurantOwner", label: "Is Restaurant Owner" },
    { path: "isCustomer", label: "Is Customer" },
    {
      key: "view",
      label: "Actions",
      content: users => (
        <Row>
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
                    id: users._id,
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
    deleteUser(id);
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
      <CustomTable
        title="Users"
        columns={columns}
        data={users.map(user => ({
          ...user,
          isAdmin: user.isAdmin ? "true" : "false",
          isRestaurantOwner: user.isRestaurantOwner ? "true" : "false"
        }))}
      />
    </Card>
  );
};

export default Users;
