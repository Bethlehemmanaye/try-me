import { reduxStatus } from "constants/reduxStatus";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  Add,
  Edit,
  Fetch,
  Remove,
  selectAddStatus,
  selectCustomers,
  selectDeleteStatus,
  selectEditStatus,
  selectFetchStatus,
} from "store/Customers";
import Customers from "./Customers";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchCustomers,
  addCustomer,
  editStatus,
  editCustomer,
  deleteStatus,
  deleteCustomer,
  customers,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setData(customers);
  }, [customers, setData]);

  useEffect(() => {
    setFetchLock(false);
    fetchCustomers();
  }, [fetchCustomers, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Restaurant Owners");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock, fetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Restaurant Owner");
      setAddLock(true);
    }
  }, [addStatus, setAddLock, addLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Restaurant Owner");
      setEditLock(true);
    }
  }, [editStatus, setEditLock, editLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Restaurant Owner");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock, deleteLock]);

  const _addCustomer = (data) => {
    setAddLock(false);
    addCustomer(data);
  };

  const _editCustomer = (data) => {
    setEditLock(false);
    editCustomer(data);
  };

  const _deleteCustomer = (id) => {
    setDeleteLock(false);
    deleteCustomer(id);
  };
  return (
    <Customers
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addCustomer={_addCustomer}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editCustomer={_editCustomer}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteCustomer={_deleteCustomer}
      customers={data}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  customers: selectCustomers(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCustomers: () => dispatch(Fetch()),
  addCustomer: (data) => dispatch(Add(data)),
  editCustomer: (data) => dispatch(Edit(data)),
  deleteCustomer: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
