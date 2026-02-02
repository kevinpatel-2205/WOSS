import { useState } from "react";
import { requestLeave } from "../../utils/leaveUtils.js";

const Leave = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaves, setLeaves] = useState([]);

  const isDisabled = !startDate || !endDate;

  const handleSubmit = () => {
    const result = requestLeave(startDate, endDate, leaves);

    setLeaves([
      ...leaves,
      {
        startDate,
        endDate,
        ...result,
        approved: result.approved,
      },
    ]);
    // console.log(leaves);

    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Apply for Leave
        </h1>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="startDate"
          >
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="endDate"
          >
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button
          disabled={isDisabled}
          onClick={handleSubmit}
          className={`w-full py-2 rounded-lg font-medium transition mb-6
            ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
        >
          Submit Leave Request
        </button>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-64 overflow-y-auto">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            Leave Status
          </h2>

          {leaves.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {leaves.map((leave, index) => (
                <li key={index} className="border rounded-md p-3 bg-white">
                  <p>
                    <b>From:</b> {leave.startDate}
                  </p>
                  <p>
                    <b>To:</b> {leave.endDate}
                  </p>
                  <p
                    className={`mt-1 font-medium ${leave.approved ? "text-green-600" : "text-red-600"}`}
                  >
                    {leave.message}
                  </p>
                  {leave.approved && (
                    <p className="text-gray-600">
                      UnPaid Leave: {leave.casualLeave} days, Paid Leave:{" "}
                      {leave.paidLeave} days
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No leave requests submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leave;
