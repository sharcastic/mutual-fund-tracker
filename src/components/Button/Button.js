import React from "react";
import { CircularProgress } from "@material-ui/core";

import "./Button.scss";

const Button = ({
  children,
  onClick,
  placeholder = "",
  className = "",
  loading = false,
}) => {
  return (
    <button
      onClick={onClick}
      placeholder={placeholder}
      className={`button ${className}`}
    >
      {loading ? <CircularProgress size={15} /> : <span>{children}</span>}
    </button>
  );
};

export default Button;
