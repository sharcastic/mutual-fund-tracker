import React from "react";
import { useNavigate } from "react-router-dom";

import {
  randomNumberGenerator,
  arrOfFundHouses,
  arrOfSchemeTypes,
} from "../../constants";
import { ReactComponent as RightIcon } from "../../assets/right-arrow.svg";
import "./MenuItem.scss";

const MenuItem = ({
  schemeCode,
  schemeName,
  fund_house = arrOfFundHouses[randomNumberGenerator(arrOfFundHouses.length)],
  scheme_type = arrOfSchemeTypes[
    randomNumberGenerator(arrOfSchemeTypes.length)
  ],
}) => {
  const navigate = useNavigate();
  const onItemClick = () => {
    navigate(`/fund/${schemeCode}`);
  };
  return (
    <div onClick={onItemClick} className="menu-item">
      <h5>{schemeName}</h5>
      <div className="item-content">
        <div className="content-left">
          <span>{fund_house}</span>
          <span>{scheme_type}</span>
        </div>
        <div className="content-right">
          <span>Profit/Loss %</span>
          <span className="percentage">{randomNumberGenerator(20)}%</span>
        </div>
        <RightIcon className="right-icon" />
      </div>
    </div>
  );
};

export default MenuItem;
