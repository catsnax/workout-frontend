import { useDataStore } from "../store/dataStore";

function ViewWorkout() {
  const sharedData = useDataStore((state) => state.sharedData);
  console.log("Shared Data:", sharedData);
  return (
    <div className="w-full h-full flex justify-center items-center  flex-col">
      <h1 className="text-2xl font-bold mb-4">View Workout</h1>
      <button>Add New Exercise</button>
    </div>
  );
}

export default ViewWorkout;
