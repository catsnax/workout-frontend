import { useDataStore } from "../store/dataStore";
import Modal from "../components/Modal.tsx";
import { useModalStore } from "../store/modalStore";
import AddExerciseForm from "../components/AddExerciseForm";
import { useQuery } from "@tanstack/react-query";
import WorkoutCard from "../components/ExerciseCard.tsx";

function ViewWorkout() {
  const open = useModalStore((state) => state.open);
  const sharedData = useDataStore((state) => state.sharedData);
  const handleAddExercise = () => {
    open(<AddExerciseForm SK={sharedData?.SK} />);
  };

  const fetchExercises = async (pk: string) => {
    const res = await fetch(
      `https://rntibe12r1.execute-api.us-east-1.amazonaws.com/exercises?pk=${encodeURIComponent(
        sharedData?.SK
      )}`
    );
    if (!res.ok) throw new Error("Failed to fetch exercises");
    const data = await res.json();
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises", sharedData?.SK],
    queryFn: () => fetchExercises(sharedData?.SK),
    enabled: !!sharedData?.SK,
  });
  if (!isLoading) {
    data.body = JSON.parse(data.body);
    console.log(data.body);
  }

  return isLoading ? (
    <div> Loading..</div>
  ) : (
    <div className="w-full h-full flex justify-center items-center  flex-col">
      <h1 className="text-2xl font-bold mb-4">View Workout</h1>
      <button onClick={handleAddExercise}>Add New Exercise</button>
      <Modal />
      <div className="flex">
        {data.body.map((exercise: any, index: any) => (
          <WorkoutCard
            key={index}
            exerciseName={exercise.exerciseName.S}
            sets={parseInt(exercise.numberOfSets.S)}
            weight={exercise.weight.S}
            unitMeasurement={exercise.unitMeasurement.S}
            PK={exercise.SK.S}
          />
        ))}
      </div>
    </div>
  );
}

export default ViewWorkout;
