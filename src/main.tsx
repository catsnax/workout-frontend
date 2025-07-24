import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import WorkoutPage from "./pages/WorkoutPage.tsx";
import ViewWorkout from "./pages/ViewWorkout.tsx";
import HomePage from "./pages/HomePage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workout" element={<WorkoutPage />} />
        <Route path="/view-workout" element={<ViewWorkout />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
