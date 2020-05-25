import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import LoginModal from "../components/LoginModal/LoginModal";
import ApplicationContext from "../context/ApplicationContext";
import "../styles/LoginPage.scss";

const App = () => {
  const navigate = useNavigate();
  const { signOutAttempt, userState } = useContext(ApplicationContext);
  const [modalOpen, setModalOpen] = useState(false);

  const onSignoutClick = () => {
    signOutAttempt();
  };
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
        <button onClick={onTrackerOpen}>Open Tracker!</button>
        <button onClick={onSignoutClick}>Sign Out!!</button>
        {userState.user && <div>USER LOGGED IN CURRENTLY!</div>}
        {modalOpen && <LoginModal closeModal={closeModal} />}
      </header>
    </div>
  );
};

export default App;