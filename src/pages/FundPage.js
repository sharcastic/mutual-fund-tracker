import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import {
  ADD_ITEM_TO_WATCHLIST,
  REMOVED_ITEM_FROM_WATCHLIST,
} from "../constants";
import ApplicationContext from "../context/ApplicationContext";
import LineChart from "../components/LineChart/LineChart";

const FundPage = () => {
  const { addToWatchlist, removeFromWatchlist, watchlist } = useContext(
    ApplicationContext
  );
  const { id } = useParams();
  const [alreadyInWatchlist, setInWatchlist] = useState(false);
  const [fundDetails, setFundDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [operationLoading, setOperationLoading] = useState(false);

  const onWatchlistClick = async () => {
    setOperationLoading(true);
    if (alreadyInWatchlist) {
      const { status } = await removeFromWatchlist(fundDetails.meta);
      if (status === REMOVED_ITEM_FROM_WATCHLIST) {
        setOperationLoading(false);
      }
    } else {
      const { status } = await addToWatchlist(fundDetails.meta);
      if (status === ADD_ITEM_TO_WATCHLIST) {
        setOperationLoading(false);
      }
    }
  };

  useEffect(() => {
    const item = watchlist.find((i) => i.scheme_code === parseInt(id, 10));
    setInWatchlist(!!item);
  }, [id, watchlist]);

  useEffect(() => {
    const retrieveFundDetails = async (url) => {
      try {
        const { data, meta } = await fetch(url).then((res) => res.json());
        if (data.length === 0) {
          setError("No fund found for this ID!");
        }
        const formattedData = data.reverse().map(({ date, nav }) => {
          const [dd, mm, yyyy] = date.split("-");
          return { y: nav, x: `${yyyy}-${mm}-${dd}` };
        });
        setFundDetails({ data: formattedData, meta });
      } catch (err) {
        console.log("ERROR", err);
        setError("FETCH ERROR");
      } finally {
        setLoading(false);
      }
    };
    retrieveFundDetails(`https://api.mfapi.in/mf/${id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div>Fund Page of scheme - {id}</div>
      {loading ? (
        <div>Loading fund details!</div>
      ) : (
        <div>
          {error ? (
            <div>{error}</div>
          ) : (
            <div>
              <div>Fund Details!</div>
              <div>Fund House - {fundDetails.meta.fund_house}</div>
              <div>Scheme Category - {fundDetails.meta.scheme_category}</div>
              <div>Scheme Type - {fundDetails.meta.scheme_type}</div>
              <LineChart data={fundDetails.data} id={id} />
              <button onClick={onWatchlistClick} disabled={operationLoading}>
                {alreadyInWatchlist
                  ? "Remove from Watchlist"
                  : "Add to Watchlist"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FundPage;
