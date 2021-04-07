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
  selectCategories,
  selectDeleteStatus,
  selectEditStatus,
  selectFetchStatus
} from "store/Categories";

import Categorys from "./Categorys";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchCategorys,
  addCategory,
  editStatus,
  editCategory,
  deleteStatus,
  deleteCategory,
  categorys,
  categories,
  selectedRestaurant
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  useEffect(() => {
    setData(categorys);
  }, [categorys, setData]);

  useEffect(() => {
    setFetchLock(false);
    fetchCategorys();
  }, [fetchCategorys, setFetchLock]);

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

  const _addCategory = data => {
    setAddLock(false);
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    addCategory(formData);
  };

  const _editCategory = data => {
    setEditLock(false);
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    editCategory(formData);
  };

  const _deleteCategory = id => {
    setDeleteLock(false);
    deleteCategory(id);
  };
  return (
    <Categorys
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addCategory={_addCategory}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editCategory={_editCategory}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteCategory={_deleteCategory}
      categorys={data}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  categorys: selectCategories(state)
});

const mapDispatchToProps = dispatch => ({
  fetchCategorys: () => dispatch(Fetch()),
  addCategory: data => dispatch(Add(data)),
  editCategory: data => dispatch(Edit(data)),
  deleteCategory: id => dispatch(Remove(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);
