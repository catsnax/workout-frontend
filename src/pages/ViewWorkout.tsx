import { useDataStore } from "../store/dataStore";
import Modal from "../components/Modal.tsx";
import { useModalStore } from "../store/modalStore";
import AddExerciseForm from "../components/AddExerciseForm";

function ViewWorkout() {
  const open = useModalStore((state) => state.open);
  const sharedData = useDataStore((state) => state.sharedData);
  const handleAddExercise = () => {
    open(<AddExerciseForm SK={sharedData?.SK} />);
  };

  console.log("Shared Data:", sharedData);
  return (
    <div className="w-full h-full flex justify-center items-center  flex-col">
      <div> </div>
      <Modal />
      <h1 className="text-2xl font-bold mb-4">View Workout</h1>
      <button onClick={handleAddExercise}>Add New Exercise</button>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Exercise</th>
            <th className="border px-4 py-2">Sets</th>
            <th className="border px-4 py-2">Weight</th>
            <th className="border px-4 py-2">Unit Measurement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ViewWorkout;
