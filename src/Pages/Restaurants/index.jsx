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
  selectFetchStatus,
} from "store/Restaurants";
import CategoryManagment from "./Restaurants";

const Loader = ({
  fetchStatus,
  addStatus,
  fetchCategories,
  addCategory,
  editStatus,
  editCategory,
  deleteStatus,
  deleteCategory,
  categorys,
}) => {
  const [data, setData] = useState([]);
  const [fetchLock, setFetchLock] = useState(true);
  const [addLock, setAddLock] = useState(true);
  const [editLock, setEditLock] = useState(true);
  const [deleteLock, setDeleteLock] = useState(true);

  //   const [categoryCategory, setCategoryCategory] = useState("");

  useEffect(() => {
    setData(categorys);
  }, [categorys, setData]);

  //   // For Category of an author
  //   useEffect(() => {
  //     const categoryId = "60465553775605561ddef264";
  //     const category = categorys.filter(e => e.category._id === categoryId);
  //     setCategoryCategory(category);
  //   }, [categorys]);

  useEffect(() => {
    setFetchLock(false);
    fetchCategories();
  }, [fetchCategories, setFetchLock]);

  useEffect(() => {
    const { status } = fetchStatus;
    if (status === reduxStatus.failure && !fetchLock) {
      toast.error("Failed fetching Categories");
      setFetchLock(true);
    }
  }, [fetchStatus, setFetchLock, fetchLock]);

  useEffect(() => {
    const { status } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Added Category");
      setAddLock(true);
    }
  }, [addStatus, setAddLock, addLock]);

  useEffect(() => {
    const { status } = editStatus;
    if (status === reduxStatus.failure && !editLock) {
      setEditLock(true);
    } else if (status === reduxStatus.success && !editLock) {
      toast.success("Edited Category");
      setEditLock(true);
    }
  }, [editStatus, setEditLock, editLock]);

  useEffect(() => {
    const { status } = deleteStatus;
    if (status === reduxStatus.failure && !deleteLock) {
      setDeleteLock(true);
    } else if (status === reduxStatus.success && !deleteLock) {
      toast.success("Deleted Category");
      setDeleteLock(true);
    }
  }, [deleteStatus, setDeleteLock, deleteLock]);

  const _addCategory = (data) => {
    setAddLock(false);
    addCategory(data);
  };

  const _editCategory = (data) => {
    setEditLock(false);
    editCategory(data);
  };

  const _deleteCategory = (id) => {
    setDeleteLock(false);
    deleteCategory(id);
  };
  return (
    <CategoryManagment
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addCategory={_addCategory}
      doneEdit={editStatus.status === reduxStatus.success && !editLock}
      editCategory={_editCategory}
      doneDelete={deleteStatus.status === reduxStatus.success && !deleteLock}
      deleteCategory={_deleteCategory}
      categorys={data}
      //   categoryCategory={categoryCategory}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  fetchStatus: selectFetchStatus(state),
  addStatus: selectAddStatus(state),
  editStatus: selectEditStatus(state),
  deleteStatus: selectDeleteStatus(state),
  categorys: selectCategories(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(Fetch()),
  addCategory: (data) => dispatch(Add(data)),
  editCategory: (data) => dispatch(Edit(data)),
  deleteCategory: (id) => dispatch(Remove(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
