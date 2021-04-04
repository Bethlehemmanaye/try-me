import { reduxStatus } from "constants/reduxStatus";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import auth from "services/authService";
import { Add, selectAddStatus } from "store/Auth";
import Auth from "./SignIn";

const Loader = ({ addStatus, addAuth }) => {
  const [addLock, setAddLock] = useState(true);

  useEffect(() => {
    const { status, response } = addStatus;
    if (status === reduxStatus.failure && !addLock) {
      setAddLock(true);
    } else if (status === reduxStatus.success && !addLock) {
      toast.success("Success Login");
      auth.login(response);
      window.location = "/";
      setAddLock(true);
    }
  }, [addStatus, setAddLock, addLock]);

  const _addAuth = data => {
    setAddLock(false);
    addAuth(data);
  };

  return (
    <Auth
      doneAdd={addStatus.status === reduxStatus.success && !addLock}
      addAuth={_addAuth}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  addStatus: selectAddStatus(state)
});

const mapDispatchToProps = dispatch => ({
  addAuth: data => dispatch(Add(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);
