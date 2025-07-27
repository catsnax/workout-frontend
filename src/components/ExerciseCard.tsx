type WorkoutCardProps = {
  exerciseName: string;
  sets: number;
  weight: string;
  unitMeasurement: string;
  PK: string;
  workout: string;
};

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useGetRequest from "../hooks/useGetRequest";
import usePostRequest from "../hooks/usePostRequest";
import usePatchRequest from "../hooks/usePatchRequest";
import useDeleteRequest from "../hooks/useDeleteRequest";
import Modal from "./Modal.tsx";

export default function ExerciseCard({
  exerciseName,
  sets,
  weight,
  unitMeasurement,
  PK,
  workout,
}: WorkoutCardProps) {
  type NewSet = {
    PK: string;
    SK: string;
    numberOfReps: string;
    weight: string;
  };

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);
  const url = import.meta.env.VITE_AWS_URL;

  const createSet = usePostRequest<NewSet>(`${url}/sets`, ["sets"]);
  const patchSet = usePatchRequest<NewSet>(`${url}/sets`, ["sets"]);

  const deleteExercise = useDeleteRequest<{ pk: string; sk: string }>(
    `${url}/exercises`,
    ["exercises"]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["exercises", PK],
    queryFn: async () => {
      const response = await useGetRequest(PK, `${url}/sets`);
      return { ...response, body: JSON.parse(response.body) };
    },
  });

  useEffect(() => {
    if (!isLoading) {
      if (data.body.length > 0) {
        const newInputs = data.body.map((set: any) => set.numberOfReps.S);
        setRepsInputs(newInputs);
      }
    }
  }, [data]);

  const handlePostSave = () => {
    const isAnyEmpty = repsInputs.some((reps) => reps.trim() === "");
    if (isAnyEmpty) {
      alert("Please fill in all the reps fields before saving.");
      return;
    }

    repsInputs.forEach((reps, index) => {
      createSet.mutate({
        PK,
        SK: `SET#${index + 1}`,
        numberOfReps: reps,
        weight,
      });
    });
    data.body.length += 1;
  };

  const handlePatchSave = () => {
    repsInputs.forEach((reps, index) => {
      if (!reps) return;
      patchSet.mutate({
        PK,
        SK: `SET#${index + 1}`,
        numberOfReps: reps,
        weight,
      });
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log(PK);
    console.log(workout);
    deleteExercise.mutate({
      pk: workout,
      sk: PK,
    });
  };

  const [repsInputs, setRepsInputs] = useState<string[]>(
    Array.from({ length: sets }, () => "")
  );

  return isLoading ? (
    <div> Loading..</div>
  ) : (
    <div className="p-4 max-w-md mx-auto flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-10 border border-gray-200 h-full w-full relative text-center">
        <Modal />
        <h2
          className="text-red-900 absolute top-4 right-4 cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </h2>
        <h3 className="text-xl font-semibold mb-4 mt-2 text-gray-800">
          {exerciseName}
        </h3>
        {data.body.length == 0 ? (
          <></>
        ) : (
          <h2
            className=" ml-auto  px-4 py-2 absolute text-green-900 top-2 left-4 cursor-pointer"
            onClick={toggleEdit}
          >
            Edit
          </h2>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full w-1/2 text-sm text-left text-gray-700">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="py-2 pr-4">Set</th>
                <th className="py-2 pr-4">Reps</th>
                <th className="py-2">Weight</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: sets }).map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 pr-4">{index + 1}</td>
                  <td className="py-2 pr-4">
                    {data.body.length == 0 || isEditing ? (
                      <input
                        type="number"
                        className="w-16 border border-black rounded-md text-center"
                        value={repsInputs[index]}
                        onChange={(e) => {
                          const updated = [...repsInputs];
                          updated[index] = e.target.value;
                          setRepsInputs(updated);
                        }}
                      />
                    ) : (
                      <div className="text-center">{repsInputs[index]}</div>
                    )}
                  </td>
                  <td className="py-2">{weight + " " + unitMeasurement}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.body.length == 0 ? (
            <button
              className="text-black mt-2 bg-gray-300 rounded-md px-14 h-10"
              onClick={() => handlePostSave()}
            >
              Save
            </button>
          ) : isEditing ? (
            <button
              className="text-black mt-2 bg-gray-300 rounded-md px-14 h-10"
              onClick={() => handlePatchSave()}
            >
              Save
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
