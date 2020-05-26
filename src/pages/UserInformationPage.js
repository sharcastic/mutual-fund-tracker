import React, { useState, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@material-ui/core";

import Button from "../components/Button/Button";
import "../styles/UserInformationPage.scss";
import ApplicationContext from "../context/ApplicationContext";
import { ADDED_PROFILE_DATA } from "../constants";

const UserInformationPage = () => {
  const { addProfileDetails } = useContext(ApplicationContext);
  const [selectedGender, setGender] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const [age, setAge] = useState();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  if (!state || !state.allowed) {
    Navigate({ to: "/" });
  }

  const onGenderChange = (event) => setGender(event.target.value);
  const onTextBoxChange = ({ target: { name, value } }) => {
    if (name === "age") {
      setAge(value);
    } else setName(value);
  };
  const onSaveDetailsClick = async () => {
    setLoading(true);
    const { status } = await addProfileDetails({
      gender: selectedGender,
      age,
      name,
    });
    setLoading(false);
    if (status === ADDED_PROFILE_DATA) {
      navigate("/home");
    }
  };

  return (
    <div className="user-info-page">
      <h2>Add User Info!</h2>
      <form>
        <TextField
          name="name"
          value={name}
          onChange={onTextBoxChange}
          label="Name"
          placeholder="Enter your name"
          variant="outlined"
          className="name-field"
        />
        <TextField
          name="age"
          value={age}
          onChange={onTextBoxChange}
          type="number"
          label="Age"
          placeholder="How old are you?"
          variant="outlined"
          className="age-field"
        />
        <div className="gender-field">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            name="gender"
            value={selectedGender}
            onChange={onGenderChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </div>
      </form>
      <Button
        hidden={!age || !name || !selectedGender}
        onClick={onSaveDetailsClick}
        loading={loading}
      >
        Save Details!
      </Button>
    </div>
  );
};

export default UserInformationPage;
