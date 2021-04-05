import { reduxStatus } from "constants/reduxStatus";
import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  Add,
  Edit,
  Fetch,
  Remove,
  selectAddStatus,
  selectOrders,
  selectDeleteStatus,
  selectEditStatus,
  selectFetchStatus
} from "store/Orders";
import { AuthUserContext } from "pages/Session";

import { selectFoods } from "store/Foods";
import { selectCategories } from "store/Categories";

import Orders from "./Orders";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchOrders,
  addOrder,
  editStatus,
  editOrder,
  deleteStatus,
  deleteOrder,
  orders,
  foods,
  categories
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setData(orders);
  }, [orders, setData]);

  useEffect(() => {
    setFetchLock(false);
    fetchOrders();
  }, [fetchOrders, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Orders");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock, fetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Order");
      setAddLock(true);
    }
  }, [addStatus, setAddLock, addLock]);

  useEffect(() => {
    const { status, response } = editStatus;
    console.log(response,"response")
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Order");
      setEditLock(true);
    }
  }, [editStatus, setEditLock, editLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Order");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock, deleteLock]);

  const _addOrder = data => {
    setAddLock(false);
    addOrder(data);
  };

  const _editOrder = data => {
    setEditLock(false);
    editOrder(data);
  };

  const _deleteOrder = id => {
    setDeleteLock(false);
    deleteOrder(id);
  };
  return (
    <Orders
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addOrder={_addOrder}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editOrder={_editOrder}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteOrder={_deleteOrder}
      orders={data}
      options={{ foods, authUser: useContext(AuthUserContext), categories }}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  orders: selectOrders(state),
  foods: selectFoods(state),
  categories: selectCategories(state)
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(Fetch()),
  addOrder: data => dispatch(Add(data)),
  editOrder: data => dispatch(Edit(data)),
  deleteOrder: id => dispatch(Remove(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);
