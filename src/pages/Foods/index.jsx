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
  selectFoods,
  selectDeleteStatus,
  selectEditStatus,
  selectFetchStatus,
} from "store/Foods";
import Foods from "./Foods";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchFoods,
  addFood,
  editStatus,
  editFood,
  deleteStatus,
  deleteFood,
  restaurantOwners,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setData(restaurantOwners);
  }, [restaurantOwners, setData]);

  useEffect(() => {
    setFetchLock(false);
    fetchFoods();
  }, [fetchFoods, setFetchLock]);

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

  const _addFood = (data) => {
    setAddLock(false);
    addFood(data);
  };

  const _editFood = (data) => {
    setEditLock(false);
    editFood(data);
  };

  const _deleteFood = (id) => {
    setDeleteLock(false);
    deleteFood(id);
  };
  return (
    <Foods
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addFood={_addFood}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editFood={_editFood}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteFood={_deleteFood}
      restaurantOwners={data}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  restaurantOwners: selectFoods(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchFoods: () => dispatch(Fetch()),
  addFood: (data) => dispatch(Add(data)),
  editFood: (data) => dispatch(Edit(data)),
  deleteFood: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
