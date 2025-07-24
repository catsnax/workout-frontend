import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useModalStore } from "../store/modalStore";

type AddExerciseFormProps = {
  SK: string;
};

export default function AddExerciseForm({ SK }: AddExerciseFormProps) {
  const { close } = useModalStore();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newWorkout: {
      PK: string;
      exerciseName: string;
      numberOfSets: string;
      weight: string;
      unitMeasurement: string;
    }) =>
      axios.post(
        "https://rntibe12r1.execute-api.us-east-1.amazonaws.com/exercises",
        newWorkout
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      close();
    },
  });

  const [PK] = useState(SK);
  const [exerciseName, setExerciseName] = useState("");
  const [numberOfSets, setNumberOfSets] = useState("");
  const [weight, setWeight] = useState("");
  const [unitMeasurement, setUnitMeasurement] = useState("kg");

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-lg text-black font-semibold mb-4">Add New Workout</h2>

      {/*}
      <select
        className="border-2 p-2 border-black text-black mb-2 w-1/2"
        value={targetDay}
        onChange={(e) => setTargetDay(e.target.value)}
      >
        <option value="full">Full Body</option>
        <option value="upper">Upper Body</option>
        <option value="lower">Lower Body</option>
        <option value="Push">Push</option>
        <option value="Pull">Pull</option>
        <option value="Legs">Legs</option>
        <option value="Arms">Arms</option>
      </select>
    */}
      <input
        className="border-2 p-2 border-black text-black mb-2 w-1/2"
        placeholder="Exercise Name"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
      />
      <select
        className="border-2 p-2 border-black text-black mb-2 w-1/2"
        value={numberOfSets}
        onChange={(e) => setNumberOfSets(e.target.value)}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <div className="flex justify-between w-1/2 mb-2 gap-2">
        <input
          className="border-2 p-2 h-12 border-black text-black mb-2 w-1/2"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <select
          className="border-2 p-2 h-12 border-black text-black w-1/2"
          onChange={(e) => setUnitMeasurement(e.target.value)}
        >
          <option value="kg">Kilograms</option>
          <option value="lbs">Pounds</option>
        </select>
      </div>
      <button
        className="text-black"
        onClick={() => {
          mutation.mutate({
            PK,
            exerciseName,
            numberOfSets,
            weight,
            unitMeasurement,
          });
        }}
      >
        {" "}
        Create New Exercise
      </button>
    </div>
  );
}
