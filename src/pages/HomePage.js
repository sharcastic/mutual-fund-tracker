import React, { useState, useEffect } from "react";

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

  const onInputChange = (event) => setSearchTerm(event.target.value);
  return (
    <div>
      <div>Home Page!</div>
      <div>
        <input value={searchTerm} onChange={onInputChange} />
      </div>
      <div>
        {loading ? (
          <div>Loading Funds!</div>
        ) : (
          <div>
            {listOfFunds.length === 0 ? (
              <div>No funds matching the search term! Try again!</div>
            ) : (
              listOfFunds.map(({ schemeName, schemeCode }) => (
                <MenuItem
                  key={schemeCode}
                  schemeCode={schemeCode}
                  schemeName={schemeName}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
