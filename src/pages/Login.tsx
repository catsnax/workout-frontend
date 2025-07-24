import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import "../App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (loginUser: { username: string; password: string }) =>
      axios.post(
        "https://rntibe12r1.execute-api.us-east-1.amazonaws.com/login",
        loginUser,
        {
          withCredentials: true,
        }
      ),

    onSuccess: (data) => {
      const parsedBody = JSON.parse(data.data.body);
      localStorage.setItem("PK", parsedBody.PK);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/workout");
    },
  });

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
          <h2 className="text-3xl"> Login</h2>
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
            <button
              className=" text-black rounded p-2 w-30 mb-5"
              onClick={() => {
                mutation.mutate({ username, password });
              }}
            >
              Login
            </button>
            <button
              className=" text-black rounded p-2 w-30"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
