import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ApplicationContext from "./context/ApplicationContext";
import App from "./App";
import HomePage from "./pages/HomePage";
import UserInformationPage from "./pages/UserInformationPage";

const ProtectedRoute = ({ component: Component }) => {
  const { userState } = useContext(ApplicationContext);
  if (!userState.user) {
    Navigate({ to: "/" });
  }

  return <Component />;
};

const RoutesComponent = () => {
  const { userState } = useContext(ApplicationContext);
  if (userState.restoringSession) {
    return <div>Loading Application!</div>;
  }
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/user-details"
        element={<ProtectedRoute component={UserInformationPage} />}
      />
      <Route path="/home" element={<ProtectedRoute component={HomePage} />} />
    </Routes>
  );
};

export default RoutesComponent;
