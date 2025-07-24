import Modal from "../components/Modal.tsx";
import { useModalStore } from "../store/modalStore.ts";
import { useDataStore } from "../store/dataStore.ts";
import AddWorkoutForm from "../components/AddWorkoutForm.tsx";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { Workout } from "../types/WorkoutType.ts";
import useGetRequest from "../hooks/useGetRequest.ts";
import useDeleteRequest from "../hooks/useDeleteRequest.ts";
import { useState } from "react";
import usePatchRequest from "../hooks/usePatchRequest.ts";

function WorkoutPage() {
  const [targetDay, setTargetDay] = useState("Full Body");
  const [filteredData, setFilteredData] = useState<any[] | null>(null);
  const open = useModalStore((state) => state.open);
  const handleAddWorkout = () => {
    open(<AddWorkoutForm />);
  };

  const setSharedData = useDataStore((state) => state.setSharedData);

  const navigate = useNavigate();
  const handleNavigate = (body: Workout) => {
    setSharedData(body);
    navigate("/view-workout");
  };

  const deleteWorkout = useDeleteRequest<{ pk: string; sk: string }>(
    "https://rntibe12r1.execute-api.us-east-1.amazonaws.com/workouts",
    ["workouts"]
  );

  function handleDelete(pk: string, sk: string) {
    deleteWorkout.mutate({
      pk: pk,
      sk: sk,
    });
  }

  const filterWorkout = usePatchRequest<{ PK: string; targetDay: string }>(
    "https://rntibe12r1.execute-api.us-east-1.amazonaws.com/workouts",
    ["workouts"]
  );

  async function handleFilter(PK: string, targetDay: string) {
    try {
      const result = await filterWorkout.mutateAsync({
        PK: PK,
        targetDay: targetDay,
      });

      const parsedBody = JSON.parse(result.data.body);
      setFilteredData(parsedBody);
    } catch (err) {
      console.error("Mutation failed", err);
    }
  }

  const pk = localStorage.getItem("PK");

  if (!pk) {
    return <div>Please log in to view workouts.</div>;
  }
  const { data, isLoading } = useQuery({
    queryKey: ["workouts", pk],
    queryFn: async () => {
      const response = await useGetRequest(
        pk,
        "https://rntibe12r1.execute-api.us-east-1.amazonaws.com/workouts"
      );
      return { ...response, body: JSON.parse(response.body) };
    },
  });

  return isLoading ? (
    <div> Loading..</div>
  ) : (
    <div className="flex justify-center items-center p-14 md:p-36 lg:p-56  w-full h-[vw-100]">
      <div className="flex flex-col ">
        <nav className="fixed top-8 right-20">
          <h2 className="text-lg" onClick={() => navigate("/login")}>
            Log Out
          </h2>
        </nav>
        <Modal />
        <div className="flex flex-col">
          <button
            onClick={handleAddWorkout}
            className=" mb-4 bg-[#25ab75] px-4 py-2 rounded"
          >
            Add new workout
          </button>
          <div>
            <select
              value={targetDay}
              onChange={(event) => setTargetDay(event.target.value)}
              className="text-white"
            >
              <option value="Full Body">Full Body</option>
              <option value="Upper Day">Upper Body</option>
              <option value="Lower Day">Lower Body</option>
              <option value="Push">Push</option>
              <option value="Pull">Pull</option>
              <option value="Legs">Legs</option>
              <option value="Arms">Arms</option>
            </select>
            <button
              onClick={() => handleFilter(pk, targetDay)}
              className=" mb-4 bg-[#25ab75] px-4 py-2 rounded"
            >
              Apply Filter
            </button>
            {filteredData && (
              <button
                onClick={() => setFilteredData(null)}
                className="mb-4 bg-gray-500 px-4 py-2 rounded"
              >
                Clear Filter
              </button>
            )}
          </div>
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
            {(filteredData ?? data.body).map((workout: any) => (
              <tr key={workout.SK.S}>
                <td className="border px-4 py-2">
                  {new Date(workout.date.S).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{workout.targetDay.S}</td>
                <td className="border px-4 py-2">{workout.location.S}</td>
                <td className="flex">
                  <button
                    className="bg-[#25ab75] text-xs w-full p-4 m-2"
                    onClick={() =>
                      handleNavigate({
                        SK: workout.SK.S,
                        date: workout.date.S,
                        location: workout.location.S,
                        targetDay: workout.targetDay.S,
                      })
                    }
                  >
                    View
                  </button>
                  <button
                    className="text-black bg-[#c6315f] text-white text-xs w-full p-4 m-2"
                    onClick={() => handleDelete(workout.PK.S, workout.SK.S)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WorkoutPage;
