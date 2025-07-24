import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import "../App.css";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser: {
      username: string;
      password: string;
      emailAddress: string;
    }) =>
      axios.post(
        "https://rntibe12r1.execute-api.us-east-1.amazonaws.com/users",
        newUser
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <>
      <div className="p-14 md:p-36 lg:p-56  w-full h-[vw-100]">
        <link
          href="https://fonts.googleapis.com/css2?family=Special+Gothic+Expanded+One&display=swap"
          rel="stylesheet"
        />
        <div className="flex flex-col justify-center items-center h-full ">
          <h1 className="text-4xl"> PROVINCIAL FITNESS GYM</h1>
        </div>

        <div className="flex flex-col gap-10 justify-center items-center h-full">
          <h1 className="text-3xl"> Sign Up</h1>
          <div className="flex flex-col justify-center items-center">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-600 rounded p-2 mb-4 "
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-600 rounded p-2 mb-4"
            />

            <label htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              type="email"
              onChange={(e) => setEmailAddress(e.target.value)}
              className="border border-gray-600 rounded p-2 mb-4"
            />
            <button
              className=" bg-[#25ab75] p-4 w-32 hover:bg-white hover:text-black mb-6"
              onClick={() =>
                mutation.mutate({ username, password, emailAddress })
              }
            >
              Sign Up
            </button>
            <button
              className=" bg-[#25ab75] p-4 w-32 hover:bg-white hover:text-black mb-6"
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
