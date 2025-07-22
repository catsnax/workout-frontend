function Workout() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col ">
        <button className="text-black mb-4">Add new workout</button>
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
