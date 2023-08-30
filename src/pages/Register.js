/* eslint-disable no-unused-vars */
import axios from "axios"; // Import axios
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // const { fullName, email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  // const handleSuccess = (msg) =>
  //   toast.success(msg, {
  //     position: "bottom-right",
  //   });

  // const handleError = (err) =>
  //   toast.error(err, {
  //     position: "bottom-left",
  //   });

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValue);
    // Validate the user input
    if (!inputValue.fullName) {
      toast.error("Please enter your full name");
      return;
    }

    if (!inputValue.email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!inputValue.password) {
      toast.error("Please enter your password");
      return;
    }

    //send input to server
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/signup",
        JSON.stringify(inputValue),
        // {
        //   ...inputValue,
        // },
        { withCredentials: true }
      );
      // const { data } = await fetch("http://localhost:8000/api/users/signup", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(inputValue),
      //   credentials: "include",
      // });

      console.log(data);
      const { success, message } = data;
      if (success) {
        toast.success(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="mx-auto mt-12 max-w-md">
      <header>
        <h2 className="text-[28px] font-medium mb-2">
          Sign up with your email
        </h2>
        <p className="text-sm mb-5">
          Already have an account?{" "}
          <Link
            className="text-blue-500 hover:underline decoration-blue-500"
            to="/login"
          >
            Sign in
          </Link>
        </p>
      </header>
      <form className="grid gap-y-2" onSubmit={handleRegisterSubmit}>
        <label className="flex flex-col" htmlFor="fullName">
          <span className="text-sm mb-1 font-semibold">Full Name</span>
          <input
            autoComplete="off"
            className="bg-gray-100 rounded-md outline-none px-3 py-2"
            type="text"
            id="fullName"
            placeholder="Mohammah Ali"
            // value={inputValue.fullName}
            onChange={handleOnChange}
            // onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <label className="flex flex-col" htmlFor="email">
          <span className="text-sm mb-1 font-semibold">Email address</span>
          <input
            autoComplete="off"
            className="bg-gray-100 rounded-md outline-none px-3 py-2"
            type="email"
            id="email"
            placeholder="mohammah@gmail.com"
            // value={inputValue.email}
            onChange={handleOnChange}
            // onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <label className="flex flex-col" htmlFor="password">
          <span className="text-sm mb-1 font-semibold">Password</span>
          <input
            autoComplete="off"
            className="bg-gray-100 rounded-md outline-none px-3 py-2"
            type="password"
            id="password"
            placeholder="Password"
            // value={inputValue.password}
            onChange={handleOnChange}
            // onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <label
          htmlFor="checkbox"
          className="flex items-center gap-1 py-4 ml-[1px]"
        >
          <input type="checkbox" name="checkbox" id="checkbox" />
          <p className="text-xs">
            I agree to the{" "}
            <Link
              to
              className="text-blue-500 hover:underline decoration-blue-500"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to
              className="text-blue-500 hover:underline decoration-blue-500"
            >
              Privacy Policy
            </Link>
          </p>
        </label>
        <button
          type="submit"
          className=" hover:bg-blue-600 py-2 bg-blue-500 text-white rounded-md"
        >
          Sign up
        </button>
        <button
          type="submit"
          className="py-2 flex items-center justify-center gap-2 border-[1px] text-gray-500 rounded-md hover:bg-blue-50"
        >
          <FcGoogle fontSize={25} />
          <span className="text-sm">Sign up with Google</span>
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
