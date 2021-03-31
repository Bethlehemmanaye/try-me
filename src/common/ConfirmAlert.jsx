import { confirmAlert } from "react-confirm-alert";
import Translate from "react-translate-component";
import React from "react";

const defaultTitle = "Confirm to submit";
const defaultMessage = <Translate content="areYouSure" />;
const defaultOkCallback = (id) => null;
const defaultErrCallback = (id) => null;

export const ConfirmAlert = ({
  title,
  message,
  okCallback,
  errCallback,
  id,
}) => {
  var props = {
    title: title ? title : defaultTitle,
    message: message ? message : defaultMessage,
    okCallback: okCallback ? () => okCallback(id) : defaultOkCallback,
    errCallback: errCallback ? () => errCallback(id) : defaultErrCallback,
  };
  confirmAlert({
    ...props,
    buttons: [
      { label: <Translate content="yes" />, onClick: props.okCallback },
      { label: <Translate content="no" />, onClick: props.errCallback },
    ],
  });
};
