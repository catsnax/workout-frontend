import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";

function Signup() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-full">
        <link
          href="https://fonts.googleapis.com/css2?family=Special+Gothic+Expanded+One&display=swap"
          rel="stylesheet"
        />
        <div className="flex flex-col justify-center items-center h-full ">
          <h2 className="text-4xl"> PROVINCIAL FITNESS GYM</h2>
          <h2 className="text-2xl"> Workout App</h2>
        </div>

        <div className="flex flex-col gap-10 justify-center items-center h-full">
          <h2 className="text-3xl"> Sign Up</h2>
          <div className="flex flex-col justify-center items-center">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="border border-gray-600 rounded p-2 mb-4 "
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="border border-gray-600 rounded p-2 mb-4"
            />
            <button className=" text-black rounded p-2 w-30 mb-5">
              Sign Up
            </button>
            <button
              className=" text-black rounded p-2 w-30"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
