import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import SargamEditor from "./pages/SargamEditor";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./PrivateRoute";

const AppLayout = () => {
  const location = useLocation();
  const { currentUser } = useAuth(); // get current user from context

  const hideSidebarRoutes = ["/login", "/register"];
  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <>
      {!hideSidebar && <Sidebar />}
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/gallery"
          element={
            <PrivateRoute>
              <Gallery />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <PrivateRoute>
              <SargamEditor />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect root based on authentication */}
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  </Router>
);

export default App;
