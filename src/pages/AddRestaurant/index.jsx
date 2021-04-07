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
  selectRestaurants,
  selectDeleteStatus,
  selectEditStatus,
  selectFetchStatus
} from "store/Restaurants";
import AddRestaurant from "./AddRestaurant";
import { AuthUserContext } from "pages/Session";
import routes from "config/routes";
import auth from "services/authService";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchRestaurants,
  addRestaurant,
  editStatus,
  editRestaurant,
  deleteStatus,
  deleteRestaurant,
  restaurants
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setData(restaurants);
  }, [restaurants, setData]);

  useEffect(() => {
    setFetchLock(false);
    fetchRestaurants();
  }, [fetchRestaurants, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Restaurants");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock, fetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Restaurant");
      auth.logout();
      window.location = routes.signIn;
      setAddLock(true);
    }
  }, [addStatus, setAddLock, addLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Restaurant");
      setEditLock(true);
    }
  }, [editStatus, setEditLock, editLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Restaurant");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock, deleteLock]);

  const _addRestaurant = data => {
    setAddLock(false);
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    addRestaurant(formData);
  };

  const _editRestaurant = data => {
    setEditLock(false);
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    editRestaurant(formData);
  };

  const _deleteRestaurant = id => {
    setDeleteLock(false);
    deleteRestaurant(id);
  };
  return (
    <AddRestaurant
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addRestaurant={_addRestaurant}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editRestaurant={_editRestaurant}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteRestaurant={_deleteRestaurant}
      restaurants={data}
      options={{ authUser: useContext(AuthUserContext) }}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  restaurants: selectRestaurants(state)
});

const mapDispatchToProps = dispatch => ({
  fetchRestaurants: () => dispatch(Fetch()),
  addRestaurant: data => dispatch(Add(data)),
  editRestaurant: data => dispatch(Edit(data)),
  deleteRestaurant: id => dispatch(Remove(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);
