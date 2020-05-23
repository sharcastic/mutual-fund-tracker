import React, { useState, useContext } from "react";

import ApplicationContext from "./context/ApplicationContext";
import "./App.css";

function App() {
  const { loginAttempt, signOutAttempt } = useContext(ApplicationContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  /* const onClick = useCallback(() => {
    console.log("email", email, "password", password);
    debugger;
  }, [email, password]); */
  const onClick = () => {
    console.log("email", email, "password", password);
    loginAttempt(email, password);
  };
  const onSignoutClick = () => {
    signOutAttempt();
  };
  const onChange = (field) => (event) => {
    field === "email"
      ? setEmail(event.target.value)
      : setPassword(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <label>
            <span>Email</span>
            <input
              type="email"
              onChange={onChange("email")}
              value={email}
            ></input>
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              onChange={onChange("password")}
              value={password}
            ></input>
          </label>
        </form>
        <button onClick={onClick}>Log in!</button>
        <button onClick={onSignoutClick}>Sign Out!!</button>
      </header>
    </div>
  );
}

export default App;
