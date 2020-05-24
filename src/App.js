import React, { useState, useContext } from "react";

import Modal from "./components/Modal/Modal";
import ApplicationContext from "./context/ApplicationContext";
import {
  validateEmail,
  validatePassword,
  NO_PROFILE_DATA,
  RETRIEVED_PROFILE_DATA,
} from "./constants";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const { loginAttempt, signOutAttempt, userState } = useContext(
    ApplicationContext
  );
  const [password, setPassword] = useState({ error: undefined, value: "" });
  const [email, setEmail] = useState({ error: undefined, value: "" });
  const [loginModalOpen, setModalOpen] = useState(false);

  const onClick = async () => {
    console.log("email", email, "password", password);
    const validEmail = validateEmail(email.value);
    const validPassword = validatePassword(password.value);
    if (!validEmail) {
      setEmail({ ...email, error: "Enter a valid Email ID." });
    }
    if (!validPassword) {
      setPassword({
        ...password,
        error: "Enter a password with 6 or more characters! ",
      });
    }
    if (validPassword && validEmail) {
      const { status, error = undefined } = await loginAttempt(
        email.value,
        password.value
      );
      console.log("STATUS", status);
      if (status === NO_PROFILE_DATA) {
        navigate("/user-details", { state: { allowed: true } });
      } else if (status === RETRIEVED_PROFILE_DATA) {
        navigate("/home");
      } else {
        console.log("LOGIN ERROR!", error);
      }
    }
  };
  const onSignoutClick = () => {
    signOutAttempt();
  };
  const onChange = ({ target: { name, value } }) => {
    name === "email"
      ? setEmail({ value, error: undefined })
      : setPassword({ value, error: undefined });
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

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={onTrackerOpen}>Open Tracker!</button>
        <button
          onClick={() => {
            navigate("/user-details");
          }}
        >
          Navigate to User
        </button>
        <button onClick={onSignoutClick}>Sign Out!!</button>
        {userState.user && <div>USER LOGGED IN CURRENTLY!</div>}
        {loginModalOpen && (
          <Modal onCloseClick={() => setModalOpen(false)}>
            <form>
              <div>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    onChange={onChange}
                    value={email.value}
                    name="email"
                  ></input>
                </label>
                {email.error && <div>{email.error}</div>}
              </div>

              <div>
                <label>
                  <span>Password</span>
                  <input
                    type="password"
                    onChange={onChange}
                    value={password.value}
                    name="password"
                  ></input>
                </label>
                {password.error && <div>{password.error}</div>}
              </div>
            </form>
            <button onClick={onClick}>
              {userState.loading ? "Logging user in!" : "Log in!"}
            </button>
          </Modal>
        )}
      </header>
    </div>
  );
}

export default App;
