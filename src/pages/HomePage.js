import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";

import { suggestedFunds } from "../constants";
import useDebounce from "../utils/useDebounce";
import MenuItem from "../components/MenuItem/MenuItem";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import "../styles/HomePage.scss";

const HomePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchTerm, setSearchTerm] = useState(
    state && state.searchTerm ? state.searchTerm : ""
  );
  const [listOfFunds, setListOfFunds] = useState([]);
  const [searchMode, setSearchMode] = useState(state && state.searchTerm);
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

  const onMenuItemClick = (schemeCode) => {
    navigate(`/fund/${schemeCode}`, { state: { source: "/home", searchTerm } });
  };

  const renderContent = () => {
    if (loading) {
      return <div>Loading Funds!</div>;
    }
    if (!searchMode) {
      return (
        <div>
          <h3>Here are some of our suggested funds!</h3>
          <div className="items-container">
            {suggestedFunds.map(({ schemeName, schemeCode }) => (
              <MenuItem
                key={schemeCode}
                schemeCode={schemeCode}
                schemeName={schemeName}
                onMenuItemClick={onMenuItemClick}
              />
            ))}
          </div>
        </div>
      );
    }
    if (!searchTerm) {
      return (
        <div>
          <h3>Try searching for a mutual fund!</h3>
        </div>
      );
    }
    if (listOfFunds.length === 0) {
      return <div>No funds matching the search term! Try again!</div>;
    }
    return (
      <div className="items-container">
        {listOfFunds.map(({ schemeName, schemeCode }) => (
          <MenuItem
            key={schemeCode}
            schemeCode={schemeCode}
            schemeName={schemeName}
            onMenuItemClick={onMenuItemClick}
          />
        ))}
      </div>
    );
  };

  const onInputChange = (event) => setSearchTerm(event.target.value);

  const closeSearchMode = () => {
    setSearchMode(false);
    setSearchTerm("");
  };

  const onSearchClick = () => {
    setSearchMode(true);
  };

  return (
    <div>
      {searchMode ? (
        <div className="home-header">
          <TextField
            placeholder="Search for a fund"
            value={searchTerm}
            onChange={onInputChange}
            name="search-term"
            autoFocus
            className="search-input"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CloseIcon onClick={closeSearchMode} className="close-icon" />
                </InputAdornment>
              ),
            }}
          />
        </div>
      ) : (
        <div className="home-header">
          <h4>Featured Funds</h4>
          <div className="home-header-right" onClick={onSearchClick}>
            <span>Search Funds</span>
            <SearchIcon title="searchIcon" className="search-icon" />
          </div>
        </div>
      )}
      <div>{renderContent()}</div>
    </div>
  );
};

export default HomePage;
