import { useState } from "react";
import axios from "axios";

function RequestTimeOff() {
  const [formData, setFormData] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("/api/leaverequests", {
        type: formData.type,
        start_date: formData.startDate,
        end_date: formData.endDate,
        reason: formData.reason,
      });
      setSuccessMessage("Leave request submitted successfully!");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Error submitting request."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { target } = event;
    const { id, value } = target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Request Time Off</h2>
        <p className="text-gray-600 text-sm">
          Please fill out this form to request time off.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select Leave Type</option>
            <option value="annual">Annual</option>
            <option value="sick">Sick</option>
            <option value="casual">Casual</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startDate"
          >
            Start Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endDate"
          >
            End Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="reason"
          >
            Reason
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reason"
            value={formData.reason}
            onChange={handleChange}
          />
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default RequestTimeOff;
