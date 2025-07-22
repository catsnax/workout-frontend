import Modal from "../components/modal.tsx";
import { useModalStore } from "../store/modalStore";
import AddWorkoutForm from "../components/AddWorkoutForm";

function Workout() {
  const open = useModalStore((state) => state.open);
  const handleAddWorkout = () => {
    open(<AddWorkoutForm />);
  };

  return (
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
          {/* Table here */}
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
            <tr>
              <td className="border px-4 py-2">July 22, 2025</td>
              <td className="border px-4 py-2">Upper Day</td>
              <td className="border px-4 py-2">Home Workout</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">July 22, 2025</td>
              <td className="border px-4 py-2">Legs</td>
              <td className="border px-4 py-2">Continental</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Workout;
