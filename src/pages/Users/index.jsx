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
  selectUsers,
  selectDeleteStatus,
  selectEditStatus,
  selectFetchStatus
} from "store/Users";

import Users from "./Users";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchUsers,
  addUser,
  editStatus,
  editUser,
  deleteStatus,
  deleteUser,
  users,
  categories,
  selectedRestaurant
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setData(users);
  }, [users, setData]);

  useEffect(() => {
    setFetchLock(false);
    fetchUsers();
  }, [fetchUsers, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Users");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock, fetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added User");
      setAddLock(true);
    }
  }, [addStatus, setAddLock, addLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited User");
      setEditLock(true);
    }
  }, [editStatus, setEditLock, editLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted User");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock, deleteLock]);

  const _addUser = data => {
    setAddLock(false);
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    addUser(formData);
  };

  const _editUser = data => {
    setEditLock(false);
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    editUser(formData);
  };

  const _deleteUser = id => {
    setDeleteLock(false);
    deleteUser(id);
  };
  return (
    <Users
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addUser={_addUser}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editUser={_editUser}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteUser={_deleteUser}
      users={data}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  users: selectUsers(state)
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(Fetch()),
  addUser: data => dispatch(Add(data)),
  editUser: data => dispatch(Edit(data)),
  deleteUser: id => dispatch(Remove(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);
