import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
  const authToken = sessionStorage.getItem("authToken");

  useEffect(() => {
    // Check if the user is authenticated (e.g., by verifying the token)

    if (authToken) {
      setIsLoggedIn(true);
      console.log("The token is " + authToken);
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
            element={
              <PrivateRoute
                path="/"
                element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
              />
            }
          />
          <Route
            element={
              <PrivateRoute
                path="/posts/:id"
                element={
                  isLoggedIn ? <SinglePostView /> : <Navigate to="/login" />
                }
              />
            }
          />
          <Route
            element={
              <PrivateRoute
                path="/studio/:id"
                element={
                  isLoggedIn ? <VideoStudioPage /> : <Navigate to="/login" />
                }
              />
            }
          />
          <Route
            element={
              <PrivateRoute
                path="/settings"
                element={isLoggedIn ? <Settings /> : <Navigate to="/login" />}
              />
            }
          />
          <Route
            element={
              <PrivateRoute
                path="/account"
                element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
              />
            }
          />
          <Route
            element={
              <PrivateRoute
                path="/users/:id"
                element={isLoggedIn ? <Users /> : <Navigate to="/login" />}
              />
            }
          />
          <Route
            element={
              <PrivateRoute
                path="/discover"
                element={isLoggedIn ? <Discover /> : <Navigate to="/login" />}
              />
            }
          />
          <Route
            element={
              <PrivateRoute
                path="/notifications"
                element={
                  isLoggedIn ? <Notifications /> : <Navigate to="/login" />
                }
              />
            }
          />
          <Route
            element={
              <PrivateRoute
                path="/subscription"
                element={
                  isLoggedIn ? <Subscriptions /> : <Navigate to="/login" />
                }
              />
            }
          />
          <Route
            element={
              <PrivateRoute
                path="/messages"
                element={
                  isLoggedIn ? <MessagesPage /> : <Navigate to="/login" />
                }
              />
            }
          />
          <Route
            element={
              <PrivateRoute
                path="/analytics"
                element={
                  isLoggedIn ? <PostAnalytics /> : <Navigate to="/login" />
                }
              />
            }
          />

          <Route
            element={
              <PrivateRoute
                path="/edit"
                element={
                  isLoggedIn ? <EditProfilePage /> : <Navigate to="/login" />
                }
              />
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
