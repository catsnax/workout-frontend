import Modal from "../components/modal.tsx";
import { useModalStore } from "../store/modalStore";
import { useState } from "react";
import AddWorkoutForm from "../components/AddWorkoutForm";
import { useQuery } from "@tanstack/react-query";

function Workout() {
  const open = useModalStore((state) => state.open);
  const handleAddWorkout = () => {
    open(<AddWorkoutForm />);
  };

  const pk = localStorage.getItem("PK");
  const fetchWorkouts = async (pk: string) => {
    const res = await fetch(
      `https://rntibe12r1.execute-api.us-east-1.amazonaws.com/workouts?pk=${encodeURIComponent(
        pk
      )}`
    );
    if (!res.ok) throw new Error("Failed to fetch workouts");
    const data = await res.json();
    return data;
  };

  if (!pk) {
    return <div>Please log in to view workouts.</div>;
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["workouts", pk],
    queryFn: () => fetchWorkouts(pk),
    enabled: !!pk,
  });
  if (!isLoading) {
    data.body = JSON.parse(data.body);
  }

  return isLoading ? (
    <div> Loading..</div>
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col ">
        <Modal />
        <div className="flex flex-col">
          <button
            onClick={handleAddWorkout}
            className=" mb-4 text-black px-4 py-2 rounded"
          >
            Add new workout
          </button>
        </div>
        <table className="">
          <thead>
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Target Day</th>
              <th className="border px-4 py-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {data.body.map((workout: any) => (
              <tr key={workout.SK.S}>
                <td className="border px-4 py-2">
                  {new Date(workout.date.S).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{workout.targetDay.S}</td>
                <td className="border px-4 py-2">{workout.location.S}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workout;
