import React, { useState, useContext } from "react";
import {
  TextField,
  Tab,
  Tabs,
  AppBar,
  InputAdornment,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";

import { ReactComponent as VisibilityIcon } from "../../assets/visibility.svg";
import { ReactComponent as VisibilityOffIcon } from "../../assets/visibility-off.svg";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ApplicationContext from "../../context/ApplicationContext";
import {
  validateEmail,
  validatePassword,
  NO_PROFILE_DATA,
  RETRIEVED_PROFILE_DATA,
} from "../../constants";

const TabPanel = ({ value, index, loading, onButtonClick, error }) => {
  const [password, setPassword] = useState({ error: undefined, value: "" });
  const [email, setEmail] = useState({ error: undefined, value: "" });
  const [showPassword, setShowPassword] = useState(false);

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
      onButtonClick(email.value, password.value);
    }
  };
  const onChange = ({ target: { name, value } }) => {
    name === "email"
      ? setEmail({ value, error: undefined })
      : setPassword({ value, error: undefined });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <div className="login-container">
          <h3>
            {value === 0
              ? "Enter your login details!"
              : "Enter your signup details!"}
          </h3>
          <form>
            <TextField
              label="Email"
              value={email.value}
              onChange={onChange}
              name="email"
              variant="outlined"
              className="email-input"
              error={!!email.error}
              helperText={email.error}
            />
            <TextField
              label="Password"
              value={password.value}
              onChange={onChange}
              name="password"
              variant="outlined"
              className="password-input"
              error={!!password.error}
              helperText={password.error}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showPassword ? (
                      <VisibilityOffIcon onClick={toggleShowPassword} />
                    ) : (
                      <VisibilityIcon onClick={toggleShowPassword} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </form>
          <Button onClick={onClick} loading={loading} className="login-button">
            {value === 0 ? "Log in!" : "Complete Sign Up!"}
          </Button>
          {error && <div className="error-message">{error}</div>}
        </div>
      )}
    </div>
  );
};

const LoginModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const { userState, loginAttempt, signUpAttempt } = useContext(
    ApplicationContext
  );
  const [tabValue, setValue] = React.useState(0);

  const onLoginClick = async (email, password) => {
    const { status, error = undefined } = await loginAttempt(email, password);
    if (status === NO_PROFILE_DATA) {
      navigate("/user-details", { state: { allowed: true } });
    } else if (status === RETRIEVED_PROFILE_DATA) {
      navigate("/home");
    } else {
      console.log("LOGIN ERROR!", error);
    }
  };

  const onSignUpClick = async (email, password) => {
    const { error = undefined } = await signUpAttempt(email, password);
    if (!error) {
      navigate("/user-details", { state: { allowed: true } });
    }
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  return (
    <Modal onCloseClick={closeModal}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis="x-reverse"
        index={tabValue}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          value={tabValue}
          index={0}
          loading={userState.loading}
          error={userState.error}
          onButtonClick={onLoginClick}
        />
        <TabPanel
          value={tabValue}
          index={1}
          loading={userState.loading}
          error={userState.error}
          onButtonClick={onSignUpClick}
        />
      </SwipeableViews>
    </Modal>
  );
};

export default LoginModal;
