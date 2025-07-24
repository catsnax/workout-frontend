type WorkoutCardProps = {
  exerciseName: string;
  sets: number;
  weight: string;
  unitMeasurement: string;
  PK: string;
};

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useGetRequest from "../hooks/useGetRequest";
import usePostRequest from "../hooks/usePostRequest";
import usePatchRequest from "../hooks/usePatchRequest";

export default function WorkoutCard({
  exerciseName,
  sets,
  weight,
  unitMeasurement,
  PK,
}: WorkoutCardProps) {
  type NewSet = {
    PK: string;
    SK: string;
    numberOfReps: string;
    weight: string;
  };
  const createSet = usePostRequest<NewSet>(
    "https://rntibe12r1.execute-api.us-east-1.amazonaws.com/sets",
    ["sets"]
  );
  const patchSet = usePatchRequest<NewSet>(
    "https://rntibe12r1.execute-api.us-east-1.amazonaws.com/sets",
    ["sets"]
  );

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);

  const { data, isLoading } = useQuery({
    queryKey: ["exercises", PK],
    queryFn: async () => {
      const response = await useGetRequest(
        PK,
        "https://rntibe12r1.execute-api.us-east-1.amazonaws.com/sets"
      );
      return { ...response, body: JSON.parse(response.body) };
      setRepsInputs(response.body.map((set: any) => set.numberOfReps.S));
    },
  });

  useEffect(() => {
    if (data?.body?.length > 0) {
      const newInputs = data.body.map((set: any) => set.numberOfReps.S);
      setRepsInputs(newInputs);
    }
  }, [data]);

  const handlePostSave = () => {
    repsInputs.forEach((reps, index) => {
      if (!reps) return;
      createSet.mutate({
        PK,
        SK: `SET#${index + 1}`,
        numberOfReps: reps,
        weight,
      });
    });
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
  };

  const [repsInputs, setRepsInputs] = useState<string[]>(
    Array.from({ length: sets }, () => "")
  );

  return isLoading ? (
    <div> Loading..</div>
  ) : (
    <div className="p-4 max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg p-10 border border-gray-200 h-full relative">
        <button
          className="sticky top-0 right-0 ml-auto bg-white z-10 px-4 py-2 rounded shadow"
          onClick={toggleEdit}
        >
          Edit Reps
        </button>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          {exerciseName}
        </h3>

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
            <button onClick={() => handlePostSave()}> Save </button>
          ) : isEditing ? (
            <button onClick={() => handlePatchSave()}> Save </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
