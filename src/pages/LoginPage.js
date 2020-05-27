import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import LoginModal from "../components/LoginModal/LoginModal";
import ApplicationContext from "../context/ApplicationContext";
import Button from "../components/Button/Button";
import "../styles/LoginPage.scss";

const App = () => {
  const navigate = useNavigate();
  const { userState } = useContext(ApplicationContext);
  const [modalOpen, setModalOpen] = useState(false);

  const onTrackerOpen = () => {
    if (userState.user) {
      if (userState.profileDetails) {
        navigate("/home");
      } else {
        navigate("/user-details", { state: { allowed: true } });
      }
    } else {
      setModalOpen(true);
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Mutual Fund Tracker</h2>
        <h5>Features of the Application</h5>
        <ul>
          <li>User can login or signup to use this application.</li>
          <li>
            User can save some details about himself and have the option to edit
            it later on.
          </li>
          <li>
            User can search for a particular Mutual fund amongst all funds in
            India. ( API Integration with https://www.mfapi.in/)
          </li>
          <li>User can view past performance of a particular Mutual Fund. </li>
          <li>User can add a particular Mutual Fund to his own watchlist. </li>
          <li>
            Funds saved in Watchlist is saved in the database and retrieved
            whenever its needed.
          </li>
          <li>On click of back on the fund specific page, the search page will remember its search term if it was previously entered.</li>
        </ul>
        <div className="button-container">
          <Button onClick={onTrackerOpen}>Open Application</Button>
        </div>

        {modalOpen && <LoginModal closeModal={closeModal} />}
      </header>
    </div>
  );
};

export default App;
