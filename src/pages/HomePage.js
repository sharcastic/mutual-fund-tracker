import React, { useState, useEffect } from "react";

import { suggestedFunds } from "../constants";
import useDebounce from "../utils/useDebounce";
import MenuItem from "../components/MenuItem/MenuItem";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listOfFunds, setListOfFunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const retrieveSearchResults = async (url) => {
      setLoading(true);
      try {
        const data = await fetch(url).then((res) => res.json());
        setListOfFunds(data);
        setLoading(false);
        console.log("DATA", data);
      } catch (err) {
        console.log("ERROR OCCURRED!", err);
      }
    };
    if (debouncedSearchTerm) {
      retrieveSearchResults(
        `https://api.mfapi.in/mf/search?q=${debouncedSearchTerm}`
      );
    }
  }, [debouncedSearchTerm]);

  const renderContent = () => {
    if (loading) {
      return <div>Loading Funds!</div>;
    }
    if (!searchTerm) {
      return (
        <div>
          <h3>Try searching for a mutual fund!</h3>
          <div>
            <h3>Here are some of our suggested funds!</h3>
            {suggestedFunds.map(({ schemeName, schemeCode }) => (
              <MenuItem
                key={schemeCode}
                schemeCode={schemeCode}
                schemeName={schemeName}
              />
            ))}
          </div>
        </div>
      );
    }
    if (listOfFunds.length === 0) {
      return <div>No funds matching the search term! Try again!</div>;
    }
    return (
      <div>
        {listOfFunds.map(({ schemeName, schemeCode }) => (
          <MenuItem
            key={schemeCode}
            schemeCode={schemeCode}
            schemeName={schemeName}
          />
        ))}
      </div>
    );
  };

  const onInputChange = (event) => setSearchTerm(event.target.value);

  return (
    <div>
      <div>Home Page!</div>
      <div>
        <input value={searchTerm} onChange={onInputChange} />
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default HomePage;
