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
  selectRestaurantOwners,
  selectDeleteStatus,
  selectEditStatus,
  selectFetchStatus,
} from "store/RestaurantOwners";
import RestaurantOwners from "./RestaurantsOwners";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchRestaurantOwners,
  addRestaurantOwner,
  editStatus,
  editRestaurantOwner,
  deleteStatus,
  deleteRestaurantOwner,
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
    fetchRestaurantOwners();
  }, [fetchRestaurantOwners, setFetchLock]);

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

  const _addRestaurantOwner = (data) => {
    setAddLock(false);
    addRestaurantOwner(data);
  };

  const _editRestaurantOwner = (data) => {
    setEditLock(false);
    editRestaurantOwner(data);
  };

  const _deleteRestaurantOwner = (id) => {
    setDeleteLock(false);
    deleteRestaurantOwner(id);
  };
  return (
    <RestaurantOwners
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addRestaurantOwner={_addRestaurantOwner}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editRestaurantOwner={_editRestaurantOwner}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteRestaurantOwner={_deleteRestaurantOwner}
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
  restaurantOwners: selectRestaurantOwners(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchRestaurantOwners: () => dispatch(Fetch()),
  addRestaurantOwner: (data) => dispatch(Add(data)),
  editRestaurantOwner: (data) => dispatch(Edit(data)),
  deleteRestaurantOwner: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
