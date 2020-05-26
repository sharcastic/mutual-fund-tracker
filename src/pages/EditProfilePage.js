import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";

import "../styles/EditProfilePage.scss";
import Button from "../components/Button/Button";
import ApplicationContext from "../context/ApplicationContext";
import { ADDED_PROFILE_DATA } from "../constants";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const {
    userState: { profileDetails },
    addProfileDetails,
    signOutAttempt,
  } = useContext(ApplicationContext);
  const [age, setAge] = useState();
  const [name, setName] = useState();
  const [selectedGender, setGender] = useState();
  const [hasUpdated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profileDetails) {
      setAge(profileDetails.age);
      setGender(profileDetails.gender);
      setName(profileDetails.name);
    }
  }, [profileDetails]);

  useEffect(() => {
    if (profileDetails) {
      setUpdated(
        !(
          name === profileDetails.name &&
          age === profileDetails.age &&
          selectedGender === profileDetails.gender
        )
      );
    }
  }, [age, selectedGender, name, profileDetails]);

  const onGenderChange = (event) => setGender(event.target.value);
  const onTextBoxChange = ({ target: { name, value } }) => {
    if (name === "age") {
      setAge(value);
    } else setName(value);
  };
  const onUpdateClick = async () => {
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

  const onSignOutClick = () => {
    signOutAttempt();
    navigate("/");
  };

  return (
    <div className="user-info-page">
      <h2>Add User Info!</h2>
      {profileDetails ? (
        <>
          <form>
            <TextField
              name="name"
              value={name}
              onChange={onTextBoxChange}
              helperText="Edit your name"
              placeholder="Enter your name"
              variant="outlined"
              className="name-field"
            />
            <TextField
              name="age"
              value={age}
              onChange={onTextBoxChange}
              type="number"
              helperText="Change your age"
              placeholder="How old are you?"
              variant="outlined"
              className="age-field"
            />
            {selectedGender && (
              <div className="gender-field">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  name="gender"
                  value={selectedGender}
                  defaultValue={selectedGender}
                  onChange={onGenderChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </div>
            )}
          </form>
          <Button
            hidden={!hasUpdated}
            onClick={onUpdateClick}
            loading={loading}
          >
            Save Details!
          </Button>
          <Button onClick={onSignOutClick} className="signout-button">
            Sign Out!
          </Button>
        </>
      ) : (
        <div>Loading Profile Details!</div>
      )}
    </div>
  );
};

export default EditProfilePage;
