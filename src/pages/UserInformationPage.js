import React, { useState, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import ApplicationContext from "../context/ApplicationContext";
import { ADDED_PROFILE_DATA } from "../constants";

const UserInformationPage = () => {
  const { addProfileDetails } = useContext(ApplicationContext);
  const [selectedGender, setGender] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const [age, setAge] = useState();
  const [name, setName] = useState("");
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
    const { status } = await addProfileDetails({
      gender: selectedGender,
      age,
      name,
    });
    if (status === ADDED_PROFILE_DATA) {
      navigate("/home");
    }
  };

  return (
    <div>
      <div>Add User Info!</div>
      <form>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={onTextBoxChange}
          />
        </label>
        <label>
          Age
          <input
            type="number"
            name="age"
            value={age}
            onChange={onTextBoxChange}
          />
        </label>
        <div>
          Gender
          <label>
            <input
              value="Male"
              type="radio"
              name="gender"
              checked={selectedGender === "Male"}
              onChange={onGenderChange}
            />
            Male
          </label>
          <label>
            <input
              value="Female"
              type="radio"
              name="gender"
              checked={selectedGender === "Female"}
              onChange={onGenderChange}
            />
            Female
          </label>
        </div>
      </form>
      <button
        disabled={!age || !name || !selectedGender}
        onClick={onSaveDetailsClick}
      >
        Save Details!
      </button>
    </div>
  );
};

export default UserInformationPage;
