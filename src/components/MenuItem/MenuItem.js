import React from "react";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ schemeCode, schemeName }) => {
  const navigate = useNavigate();
  const onItemClick = () => {
    navigate(`/fund/${schemeCode}`);
  };
  return <div onClick={onItemClick}>{schemeName}</div>;
};

export default MenuItem;
