import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import ApplicationContext from "../context/ApplicationContext";
import MenuItem from "../components/MenuItem/MenuItem";

const Watchlist = () => {
  const navigate = useNavigate();
  const { watchlist } = useContext(ApplicationContext);

  const onMenuItemClick = (schemeCode) => {
    navigate(`/fund/${schemeCode}`, { state: { source: "/watchlist" } });
  };
  return (
    <div>
      <h2>Watchlist page!</h2>
      {watchlist.length === 0 ? (
        <div>Add some items to your watchlist!</div>
      ) : (
        <div style={{ paddingBottom: "100px" }}>
          {watchlist.map(
            ({ scheme_code, scheme_name, fund_house, scheme_type }) => (
              <MenuItem
                key={scheme_code}
                schemeCode={scheme_code}
                schemeName={scheme_name}
                fund_house={fund_house}
                scheme_type={scheme_type}
                onMenuItemClick={onMenuItemClick}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
