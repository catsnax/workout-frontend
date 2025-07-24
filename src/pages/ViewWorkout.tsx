import { useDataStore } from "../store/dataStore";
import Modal from "../components/Modal.tsx";
import { useModalStore } from "../store/modalStore";
import AddExerciseForm from "../components/AddExerciseForm";
import { useQuery } from "@tanstack/react-query";
import ExerciseCard from "../components/ExerciseCard.tsx";
import useGetRequest from "../hooks/useGetRequest.ts";
import { useNavigate } from "react-router-dom";

function ViewWorkout() {
  const open = useModalStore((state) => state.open);
  const sharedData = useDataStore((state) => state.sharedData);
  const handleAddExercise = () => {
    open(<AddExerciseForm SK={sharedData?.SK} />);
  };

  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises", sharedData?.SK],
    queryFn: async () => {
      const response = await useGetRequest(
        sharedData?.SK,
        "https://rntibe12r1.execute-api.us-east-1.amazonaws.com/exercises"
      );
      return { ...response, body: JSON.parse(response.body) };
    },
  });

  return isLoading ? (
    <div> Loading..</div>
  ) : (
    <div className="w-full h-full flex justify-center items-center  flex-col">
      <h1 className="text-2xl font-bold mb-4">View Workout</h1>
      <h2 onClick={() => navigate("/workout")}> Go Back</h2>

      <button onClick={handleAddExercise}>Add New Exercise</button>
      <Modal />
      <div className="flex">
        {data.body.map((exercise: any, index: any) => (
          <ExerciseCard
            key={index}
            exerciseName={exercise.exerciseName.S}
            sets={parseInt(exercise.numberOfSets.S)}
            weight={exercise.weight.S}
            unitMeasurement={exercise.unitMeasurement.S}
            PK={exercise.SK.S}
            workout={exercise.PK.S}
          />
        ))}
      </div>
    </div>
  );
}

export default ViewWorkout;
