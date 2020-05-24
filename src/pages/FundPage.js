import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FundPage = () => {
  const { id } = useParams();
  const [fundDetails, setFundDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const retrieveFundDetails = async (url) => {
      try {
        const { data, meta } = await fetch(url).then((res) => res.json());
        if (data.length === 0) {
          setError("No fund found for this ID!");
        }
        setFundDetails({ data, meta });
      } catch (err) {
        console.log("ERROR", err);
        setError("FETCH ERROR");
      } finally {
        setLoading(false);
      }
    };
    retrieveFundDetails(`https://api.mfapi.in/mf/${id}`);
  }, [id]);
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
              <button>Add to Watchlist</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FundPage;
