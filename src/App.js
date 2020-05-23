import React, { useState, useContext } from "react";

import ApplicationContext from "./context/ApplicationContext";
import { validateEmail, validatePassword } from "./constants";
import "./App.css";

function App() {
  const { loginAttempt, signOutAttempt, userState } = useContext(
    ApplicationContext
  );
  const [password, setPassword] = useState({ error: undefined, value: "" });
  const [email, setEmail] = useState({ error: undefined, value: "" });

  const onClick = () => {
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
      loginAttempt(email, password);
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

  return (
    <div className="App">
      <header className="App-header">
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
        <button onClick={onClick}>Log in!</button>
        <button onClick={onSignoutClick}>Sign Out!!</button>
      </header>
    </div>
  );
}

export default App;
