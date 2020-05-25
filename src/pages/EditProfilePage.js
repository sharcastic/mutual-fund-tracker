import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ApplicationContext from "../context/ApplicationContext";
import { ADDED_PROFILE_DATA } from "../constants";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const {
    userState: { profileDetails },
    addProfileDetails,
  } = useContext(ApplicationContext);
  const [age, setAge] = useState();
  const [name, setName] = useState();
  const [selectedGender, setGender] = useState();
  const [hasUpdated, setUpdated] = useState(false);

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
      <h2>Edit Profile Page</h2>
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
      <button onClick={onUpdateClick} disabled={!hasUpdated}>
        Update details!
      </button>
    </div>
  );
};

export default EditProfilePage;
