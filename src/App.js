import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
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
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    // Check if the user is authenticated (e.g., by verifying the token)

    if (authToken) {
      setIsLoggedIn(true);
      console.log("The token is " + authToken);
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));

    setIsLoggedIn(true);
    console.log(isLoggedIn);
  };

  const handleLogOut = () => {
    axios.defaults.headers.common["x-auth-token"] = `Bearer ${authToken}`;
    axios
      .post("http://localhost:8000/api/users/logout")
      .then((response) => {
        console.log(response.data.message);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
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
            path="/"
            index
            element={<PrivateRoute path="/" element={<Home />} />}
          />
          <Route
            path="/posts/:id"
            element={<PrivateRoute path="/" element={<SinglePostView />} />}
          />
          <Route
            path="/studio/:id"
            element={<PrivateRoute path="/" element={<VideoStudioPage />} />}
          />
          <Route
            path="/settings"
            element={<PrivateRoute path="/" element={<Settings />} />}
          />
          <Route
            path="/account"
            element={<PrivateRoute path="/" element={<Profile />} />}
          />
          <Route
            path="/users/:id"
            element={<PrivateRoute path="/" element={<Users />} />}
          />
          <Route
            path="/discover"
            element={<PrivateRoute path="/" element={<Discover />} />}
          />
          <Route
            path="/notifications"
            element={<PrivateRoute path="/" element={<Notifications />} />}
          />
          <Route
            path="/subscription"
            element={<PrivateRoute path="/" element={<Subscriptions />} />}
          />
          <Route
            path="/messages"
            element={<PrivateRoute path="/" element={<MessagesPage />} />}
          />
          <Route
            path="/analytics"
            element={<PrivateRoute path="/" element={<PostAnalytics />} />}
          />

          <Route
            path="/edit"
            element={<PrivateRoute path="/" element={<EditProfilePage />} />}
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
