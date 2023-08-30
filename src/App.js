import { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
  return (
    <>
      <Nav />
      <Wrapper>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/posts/:id" element={<SinglePostView />} />
          <Route path="/studio/:id" element={<VideoStudioPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/users/:id" element={<Users />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/subscription" element={<Subscriptions />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/analytics" element={<PostAnalytics />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/watch/:id" element={<SingleVideo />} />
          <Route path="/search" element={<Search />} />
          <Route path="/edit" element={<EditProfilePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
