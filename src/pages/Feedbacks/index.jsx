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
  selectFeedbacks,
  selectDeleteStatus,
  selectEditStatus,
  selectFetchStatus
} from "store/Feedbacks";
import Feedbacks from "./Feedbacks";
import { AuthUserContext } from "pages/Session";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchFeedbacks,
  addFeedback,
  editStatus,
  editFeedback,
  deleteStatus,
  deleteFeedback,
  feedbacks,
  selectedRestaurant
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setData(feedbacks);
  }, [feedbacks, setData]);

  useEffect(() => {
    setFetchLock(false);
    fetchFeedbacks();
  }, [fetchFeedbacks, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Feedbackss");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock, fetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Feedbacks");
      setAddLock(true);
    }
  }, [addStatus, setAddLock, addLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Feedbacks");
      setEditLock(true);
    }
  }, [editStatus, setEditLock, editLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Feedbacks");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock, deleteLock]);

  const _addFeedback = data => {
    setAddLock(false);
    addFeedback(data);
  };

  const _editFeedback = data => {
    setEditLock(false);
    editFeedback(data);
  };

  const _deleteFeedback = id => {
    setDeleteLock(false);
    deleteFeedback(id);
  };
  return (
    <Feedbacks
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addFeedback={_addFeedback}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editFeedback={_editFeedback}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteFeedback={_deleteFeedback}
      feedbacks={data.filter(f => f.restaurant._id === selectedRestaurant._id)}
      options={{ selectedRestaurant, authUser: useContext(AuthUserContext) }}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  feedbacks: selectFeedbacks(state)
});

const mapDispatchToProps = dispatch => ({
  fetchFeedbacks: () => dispatch(Fetch()),
  addFeedback: data => dispatch(Add(data)),
  editFeedback: data => dispatch(Edit(data)),
  deleteFeedback: id => dispatch(Remove(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);
