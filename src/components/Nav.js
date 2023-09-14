/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineSetting,
  BiDollarCircle,
  MdOutlineAccountBox,
  MdOutlineLogin,
  MdSlowMotionVideo,
} from "../constant/icons";

import NotificationDropDown from "./notifications/DropDown/NotificationDropDown";

export default function Nav({ isLoggedIn, handleLogOut }) {
  console.log(isLoggedIn);
  const storedUserData = sessionStorage.getItem("userData");
  console.log(storedUserData);

  // Parse the JSON string back to an object

  const userData = storedUserData ? JSON.parse(storedUserData) : null;

  const token = sessionStorage.getItem("authToken");

  let loggedInUser;
  if (userData) {
    loggedInUser = userData._id;
  }
  console.log("The logged user " + loggedInUser);

  const navigate = useNavigate();
  const location = useLocation();
  const [dropDown, setDropDown] = useState(false);
  const [search, setSearch] = useState("");

  const watchPage =
    location.pathname === `/watch` ||
    location.pathname === "/studio/stream-manager";

  const handleClick = () => {
    setDropDown(() => !dropDown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
    setSearch("");
  };
  const navItems = [
    { id: 1, icon: <MdOutlineAccountBox fontSize={24} />, title: "Account" },
    {
      id: 2,
      icon: <MdSlowMotionVideo fontSize={24} />,
      title: "Creator Studio",
    },
    { id: 3, icon: <BiDollarCircle fontSize={24} />, title: "Subscription" },
    { id: 4, icon: <AiOutlineSetting fontSize={24} />, title: "Settings" },
    // {
    //   id: 5,
    //   icon: <MdOutlineLogin fontSize={24} />,
    //   title: !isLoggedIn ? "Login" : "Logout",
    // },
  ];

  //const existingUser = users.find((u) => u.userName === loggedInUser);

  const getExistingUser = async (uid) => {
    try {
      axios.defaults.headers.common["x-auth-token"] = `Bearer ${token}`;
      const response = await axios.get(
        `http://localhost:8000/api/users/${uid}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const existingUser = getExistingUser(loggedInUser);
  console.log("The existing user " + loggedInUser);

  return (
    <div
      className={`w-full sticky top-0 z-10 ${
        watchPage ? "bg-[#212121]" : "bg-w"
      }`}
    >
      <div className="flex items-center max-w-[1450px] mx-auto justify-between px-4 py-4 backdrop-blur-sm">
        <div className="flex items-center">
          <Link
            to="/"
            className={`font-bold text-3xl ${watchPage ? "text-white" : ""}`}
          >
            Header
          </Link>
          <ul className="flex items-center gap-5 ml-12">
            {["Home", "Discover", "Watch", "Messages"].map((item) => (
              <li
                className={`${
                  watchPage ? "text-white" : "hover:text-blue-500"
                }  text-[20px] mt-[3px]`}
                key={item}
              >
                <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-gray-100 rounded-3xl py-2 px-4"
          >
            <div>
              <AiOutlineSearch fontSize={23} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-28 transition-all duration-500 ml-3 outline-none focus:outline-none bg-gray-100 text-md placeholder:text-black"
              placeholder="Search"
            />
          </form>
          {isLoggedIn ? (
            <>
              <NotificationDropDown watchPage={watchPage} />
              <div className="cursor-pointer relative" onClick={handleClick}>
                <img
                  className="h-[38px] w-[38px] rounded-full"
                  src={existingUser.img}
                  alt="user"
                />
                <div
                  className={`absolute top-[109%] min-w-[250px] right-0 ${
                    dropDown ? "flex opacity-100" : "hidden opacity-0"
                  } flex-col  bg-white shadow-sm shadow-gray-300 opacity-1`}
                >
                  {navItems.map((item) => (
                    <div
                      className="w-max rounded-sm hover:bg-gray-100 px-4 py-2 min-w-full "
                      key={item.id}
                    >
                      <Link
                        to={`${
                          item.title === "Creator Studio"
                            ? `/studio/content`
                            : `/${item.title.toLowerCase()}`
                        }`}
                        className="text-black text-lg flex items-center gap-2"
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    </div>
                  ))}
                  <Link
                    to="#"
                    className="text-black text-lg flex items-center gap-2 px-4 py-2 min-w-full hover:bg-gray-100"
                    onClick={handleLogOut}
                  >
                    {<MdOutlineLogin fontSize={24} />} Logout
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}
