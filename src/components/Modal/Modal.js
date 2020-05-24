import React from "react";

import "./Modal.scss";

const Modal = ({ children, onCloseClick }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <span className="close-modal" onClick={onCloseClick}>
          Close [X]
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
