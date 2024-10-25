import { useState } from "react";
import useProfile from "../../../../hooks/useProfile";
import httpClient from "../../../../api/axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../components/Spinner";
import { toast } from "react-toastify";
import Back from "../../../../components/Back";
import useLeaveRequests from "../../../../hooks/useLeaveRequests";

function RequestTimeOff() {
  const navigate = useNavigate();
  const [totalDays, setTotalDays] = useState(0);
  const { user } = useProfile();
  const [formData, setFormData] = useState({
    department: "",
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [err, setErr] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const { refresh } = useLeaveRequests();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBusy(true);
    await httpClient
      .post(`/leave`, {
        userId: user?._id,
        typeOfLeave: formData.type,
        reason: formData.reason,
        fromDate: formData.startDate,
        toDate: formData.endDate,
        totalDays,
      })
      .then(({ data }) => {
        console.log(data);
        toast.success("Leave request submitted successfully");
        navigate("/admin");
        refresh;
      })
      .catch((error) => {
        const message =
          error?.response?.data?.message === "User not found"
            ? "Invalid Credetials"
            : error?.response?.data?.message;
        toast.error(message);
        setErr(message);
      })
      .finally(() => {
        setIsBusy(false);
      });
  };

  const handleChange = (event) => {
    const { target } = event;
    const { id, value } = target;
    setFormData({ ...formData, [id]: value });

    if (id === "startDate" || id === "endDate") {
      calculateTotalDays(formData.startDate, value);
    }
  };

  const calculateTotalDays = (start, end) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const timeDifference = endDate - startDate;
      const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1; // +1 to include the start date
      setTotalDays(dayDifference >= 0 ? dayDifference : 0); // Ensure totalDays is not negative
    } else {
      setTotalDays(0); // Reset if either date is not set
    }
  };

  return (
    <div className="space-y-4">
      <Back route={"/admin"} />
      <div className="flex flex-col px-8 pt-6 pb-8 mb-4 bg-white rounded-md shadow-md">
        <div className="mb-4">
          <h2 className="mb-2 text-lg font-bold">Request Time Off</h2>
          <p className="text-sm text-gray-600">
            Please fill out this form to request time off.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full p-3 leading-tight text-gray-700 capitalize border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={user?.name}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="department"
            >
              Department
            </label>
            <input
              className="w-full p-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="department"
              type="text"
              value={user?.department}
              onChange={(e) => handleChange(e)}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="type"
            >
              Type
            </label>
            <select
              className="w-full p-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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

          <div className="flex flex-row gap-5">
            <div className="w-full mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="start_date"
              >
                Start Date
              </label>
              <input
                className="w-full p-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange(e)}
                onClick={(e) => {
                  e.currentTarget.showPicker();
                }}
              />
            </div>
            <div className="w-full mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="end_date"
              >
                End Date
              </label>
              <input
                className="w-full p-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange(e)}
                onClick={(e) => {
                  e.currentTarget.showPicker();
                }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="totalDays"
            >
              Total Days
            </label>
            <input
              className="w-full p-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="totalDays"
              type="text"
              value={totalDays}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="reason"
            >
              Reason
            </label>
            <textarea
              className="w-full p-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="reason"
              value={formData.reason}
              onChange={(e) => handleChange(e)}
              rows={5}
            />
          </div>
          <button
            className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-primary focus:outline-none focus-shadow-outline"
            type="submit"
            disabled={isBusy}
          >
            {isBusy ? <Spinner /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestTimeOff;
