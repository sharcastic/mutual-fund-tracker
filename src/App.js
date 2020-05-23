import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { auth } from "./firebase";

function App() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  /* const onClick = useCallback(() => {
    console.log("email", email, "password", password);
    debugger;
  }, [email, password]); */
  const onClick = () => {
    console.log("email", email, "password", password);
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      console.error("Error signing in with password and email", error);
    });
  };
  const onSignoutClick = () => {
    auth.signOut().catch((error) => {
      console.error("Error while signing out!", error);
    });
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
