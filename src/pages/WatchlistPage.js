import React, { useContext } from "react";

import ApplicationContext from "../context/ApplicationContext";

const Watchlist = () => {
  const { watchlist } = useContext(ApplicationContext);
  return (
    <div>
      <h2>Watchlist page!</h2>
      {watchlist.length === 0 ? (
        <div>Add some items to your watchlist!</div>
      ) : (
        <div>
          {watchlist.map((i) => (
            <div>{i.scheme_name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
