import { useState } from "react";
import useProfile from "../../../../hooks/useProfile";
import httpClient from "../../../../api/axios";
import { useNavigate } from "react-router-dom";

function RequestTimeOff() {
  const navigate = useNavigate();
  const {user} = useProfile()
  const [formData, setFormData] = useState({
    department: "",
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [err, setErr] = useState("")
  const [isBusy, setIsBusy] = useState("")

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    await httpClient
      .post(`/leave-requests`, {
        userId: user?._id,
        type: formData.type,
        reason: formData.reason,
        startDate: formData.startDate,
        endDate: formData.endDate
      })
      .then(({data}) => {
        console.log(data)
        navigate("/admin")
      })
      .catch((error) => {
        const message = error?.response?.data?.message === "User not found" ? "Invalid Credetials" : error?.response?.data?.message
        setErr(message);
      })
      .finally(() => {
        setIsBusy(false);
      });
  };

  const handleChange = (event) => {
    // console.log(event);
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
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={user?.username}
            disabled
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="department"
          >
            Department
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="department"
            type="text"
            value={formData.department}
            onChange={(e) => handleChange(e)}
          />
        </div>
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
            onChange={(e) => handleChange(e)}
          >
            <option value="">Select Leave Type</option>
            <option value="annual">Annual</option>
            <option value="sick">Sick</option>
            <option value="casual">Casual</option>
            <option value="unpaid">Unpaid</option>
            <option value="half">Half</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="start_date"
          >
            Start Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="end_date"
          >
            End Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button
          className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RequestTimeOff;
