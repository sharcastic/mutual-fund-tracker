import React from "react";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";

import "./Modal.scss";

const Modal = ({ children, onCloseClick }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <CloseIcon
          title="Close Icon"
          className="close-modal"
          onClick={onCloseClick}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
