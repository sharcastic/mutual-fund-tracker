import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import { ReactComponent as BackIcon } from "../assets/back.svg";
import Button from "../components/Button/Button";
import {
  ADD_ITEM_TO_WATCHLIST,
  REMOVED_ITEM_FROM_WATCHLIST,
} from "../constants";
import ApplicationContext from "../context/ApplicationContext";
import LineChart from "../components/LineChart/LineChart";
import "../styles/FundPage.scss";

const FundPage = () => {
  const {
    state: { source, searchTerm = "" },
  } = useLocation();
  const navigate = useNavigate();
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

  const onBackClick = () => {
    debugger;
    navigate(source, { state: searchTerm ? { searchTerm } : undefined });
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
      {loading ? (
        <div>Loading fund details!</div>
      ) : (
        <div>
          <div className="fund-header">
            <BackIcon onClick={onBackClick} />
            <h2>Fund Details</h2>
          </div>
          {error ? (
            <div>{error}</div>
          ) : (
            <div className="fund-container">
              <h3>{fundDetails.meta.scheme_name}</h3>
              <div className="fund-info">
                <span className="fund-label">Fund House</span> -{" "}
                <span className="fund-value">
                  {fundDetails.meta.fund_house}
                </span>
              </div>
              <div className="fund-info">
                <span className="fund-label">Scheme Category</span> -{" "}
                <span className="fund-value">
                  {fundDetails.meta.scheme_category}
                </span>
              </div>
              <div className="fund-info">
                <span className="fund-label">Scheme Type</span> -{" "}
                <span className="fund-value">
                  {fundDetails.meta.scheme_type}
                </span>
              </div>
              <LineChart data={fundDetails.data} id={id} />
              <div className="button-container">
                <Button onClick={onWatchlistClick} loading={operationLoading}>
                  {alreadyInWatchlist
                    ? "Remove from Watchlist"
                    : "Add to Watchlist"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FundPage;
