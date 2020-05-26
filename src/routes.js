import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ApplicationContext from "./context/ApplicationContext";
import App from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import FundPage from "./pages/FundPage";
import WatchlistPage from "./pages/WatchlistPage";
import UserInformationPage from "./pages/UserInformationPage";
import EditProfilePage from "./pages/EditProfilePage";
import Navbar from "./components/Navbar/Navbar";

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
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/user-details"
          element={<ProtectedRoute component={UserInformationPage} />}
        />
        <Route path="/home" element={<ProtectedRoute component={HomePage} />} />
        <Route
          path="/fund/:id"
          element={<ProtectedRoute component={FundPage} />}
        />
        <Route
          path="/watchlist"
          element={<ProtectedRoute component={WatchlistPage} />}
        />
        <Route
          path="/edit-profile"
          element={<ProtectedRoute component={EditProfilePage} />}
        />
      </Routes>
    </>
  );
};

export default RoutesComponent;
