import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useModalStore } from "../store/modalStore";

export default function AddWorkoutForm() {
  const queryClient = useQueryClient();
  const { close } = useModalStore();

  const mutation = useMutation({
    mutationFn: (newWorkout: {
      PK: string;
      targetDay: string;
      location: string;
      date: string;
    }) =>
      axios.post(
        "https://rntibe12r1.execute-api.us-east-1.amazonaws.com/workouts",
        newWorkout
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      close();
    },
  });

  function getLocalDate() {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  }

  const [targetDay, setTargetDay] = useState("Full Body");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(getLocalDate());
  const [PK] = useState(localStorage.getItem("PK") || "");

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-lg text-black font-semibold mb-4">Add New Workout</h2>

      <select
        className="border-2 p-2 border-black text-black mb-2 w-1/2"
        value={targetDay}
        onChange={(e) => setTargetDay(e.target.value)}
      >
        <option value="Full Body">Full Body</option>
        <option value="Upper Day">Upper Body</option>
        <option value="Lower Day">Lower Body</option>
        <option value="Push">Push</option>
        <option value="Pull">Pull</option>
        <option value="Legs">Legs</option>
        <option value="Arms">Arms</option>
      </select>

      <input
        className="border-2 p-2 border-black text-black mb-2 w-1/2"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        className="border-2 p-2 border-black text-black mb-2 w-1/2"
        placeholder="Date"
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button
        className="text-black"
        onClick={() => {
          mutation.mutate({
            PK,
            targetDay,
            location,
            date,
          });
        }}
      >
        {" "}
        Create New Workout
      </button>
    </div>
  );
}
