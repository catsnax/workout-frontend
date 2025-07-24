import Modal from "../components/Modal.tsx";
import { useModalStore } from "../store/modalStore";
import { useDataStore } from "../store/dataStore";
import AddWorkoutForm from "../components/AddWorkoutForm";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { Workout } from "../types/WorkoutType.ts";
import useGetRequest from "../hooks/useGetRequest.ts";
import useDeleteRequest from "../hooks/useDeleteRequest.ts";

function Workout() {
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

  const pk = localStorage.getItem("PK");

  if (!pk) {
    return <div>Please log in to view workouts.</div>;
  }
  const { data, isLoading, error } = useQuery({
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
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col ">
        <h2 onClick={() => navigate("/login")}> Log Out</h2> <Modal />
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
                <td className="flex">
                  <button
                    className="text-black text-xs w-full p-4 m-2"
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
                    className="text-black text-xs w-full p-4 m-2"
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

export default Workout;
