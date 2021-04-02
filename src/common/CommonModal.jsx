import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const CommonModals = (props) => {
  const { className } = props;

  return (
    <Modal size={props.size} isOpen={props.openModal} className={className}>
      <ModalHeader
        className="text-uppercase bg-background border-0"
        toggle={() => props.toggle({ type: "CLOSE" }, props.dispatch)}
      >
        {props.title}
      </ModalHeader>
      <ModalBody className="bg-background">{props.component}</ModalBody>
    </Modal>
  );
};

CommonModals.defaultProps = {
  size: "md",
};

export default CommonModals;
