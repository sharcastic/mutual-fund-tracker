import React, { useContext } from "react";

import ApplicationContext from "../context/ApplicationContext";
import MenuItem from "../components/MenuItem/MenuItem";

const Watchlist = () => {
  const { watchlist } = useContext(ApplicationContext);
  return (
    <div>
      <h2>Watchlist page!</h2>
      {watchlist.length === 0 ? (
        <div>Add some items to your watchlist!</div>
      ) : (
        <div>
          {watchlist.map(
            ({ schemeCode, schemeName, fund_house, scheme_type }) => (
              <MenuItem
                key={schemeCode}
                schemeCode={schemeCode}
                schemeName={schemeName}
                fund_house={fund_house}
                scheme_type={scheme_type}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
