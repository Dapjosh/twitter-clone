import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Nav from "./components/Nav";
import Discover from "./pages/Discover";
import EditProfilePage from "./pages/EditProfilePage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MessagesPage from "./pages/Messages/MessagesPage";
import Notifications from "./pages/Notifications";
import PostAnalytics from "./pages/PostAnalytics";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import SinglePostView from "./pages/SinglePostView";
import Subscriptions from "./pages/Subscriptions";
import Users from "./pages/Users";
import VideoStudioPage from "./pages/VideoStudio/VideoStudioPage";
import SingleVideo from "./pages/watch/SingleVideo";
import Watch from "./pages/watch/Watch";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authToken = sessionStorage.getItem("authToken");

  useEffect(() => {
    // Check if the user is authenticated (e.g., by verifying the token)

    if (authToken) {
      setIsLoggedIn(true);
      console.log("The token is " + authToken);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = (userData, token) => {
    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("userData", JSON.stringify(userData));

    setIsLoggedIn(true);
    console.log(isLoggedIn);
  };

  const handleLogOut = () => {
    axios.defaults.headers.common["x-auth-token"] = `Bearer ${authToken}`;
    axios
      .post("http://localhost:8000/api/users/logout")
      .then((response) => {
        console.log(response.data.message);
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("userData");
        setIsLoggedIn(false);
        navigate("/login");
        // Redirect the user or perform other actions
      })
      .catch((error) => {
        // Handle errors, e.g., unauthorized or network issues
        console.error("Logout failed:", error);
      });
  };
  return (
    <>
      <Nav isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />
      <Wrapper>
        <Routes>
          <Route
            index
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/posts/:id"
            element={isLoggedIn ? <SinglePostView /> : <Navigate to="/login" />}
          />
          <Route
            path="/studio/:id"
            element={
              isLoggedIn ? (
                <VideoStudioPage isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/settings"
            element={
              isLoggedIn ? (
                <Settings isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/account"
            element={
              isLoggedIn ? (
                <Profile isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/users/:id"
            element={
              isLoggedIn ? (
                <Users isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/discover"
            element={
              isLoggedIn ? (
                <Discover isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/notifications"
            element={
              isLoggedIn ? (
                <Notifications isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/subscription"
            element={
              isLoggedIn ? (
                <Subscriptions isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/messages"
            element={
              isLoggedIn ? (
                <MessagesPage isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/analytics"
            element={
              isLoggedIn ? (
                <PostAnalytics isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/edit"
            element={
              isLoggedIn ? (
                <EditProfilePage isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/search" element={<Search />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/watch/:id" element={<SingleVideo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
