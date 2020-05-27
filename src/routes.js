import React, { useContext, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ApplicationContext from "./context/ApplicationContext";
import Navbar from "./components/Navbar/Navbar";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const FundPage = React.lazy(() => import("./pages/FundPage"));
const WatchlistPage = React.lazy(() => import("./pages/WatchlistPage"));
const EditProfilePage = React.lazy(() => import("./pages/EditProfilePage"));
const UserInformationPage = React.lazy(() =>
  import("./pages/UserInformationPage")
);

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
    <Suspense fallback={<div>Loading Application!</div>}>
      <Navbar disabledRoutes={["/", "/user-details"]} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
          path="/profile"
          element={<ProtectedRoute component={EditProfilePage} />}
        />
      </Routes>
    </Suspense>
  );
};

export default RoutesComponent;
