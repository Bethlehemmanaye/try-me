import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Logo from "../assets/Logo/Logo_Primary.png";

const CommonModals = (props) => {
  const { className } = props;

  return (
    <Modal size={props.size} isOpen={props.openModal} className={className}>
      <ModalHeader
        className="bg-background border-0"
        toggle={() => props.toggle({ type: "CLOSE" }, props.dispatch)}
      >
        <img height="40" width="40" alt="" src={Logo} /> {props.title}
      </ModalHeader>
      <ModalBody className="bg-background">{props.component}</ModalBody>
    </Modal>
  );
};

CommonModals.defaultProps = {
  size: "md",
};

export default CommonModals;
