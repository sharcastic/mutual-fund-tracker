import React from "react";
import { CircularProgress } from "@material-ui/core";

import "./Button.scss";

const Button = ({
  children,
  onClick,
  placeholder = "",
  className = "",
  loading = false,
  hidden = false,
}) => {
  return (
    <button
      onClick={onClick}
      placeholder={placeholder}
      className={`button ${className}`}
      hidden={hidden}
    >
      {loading ? (
        <CircularProgress size={15} color="white" />
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};

export default Button;
