import React, { useState } from "react";
import useProfile from "../../../hooks/useProfile";
import Spinner from "../../../components/Spinner";
import httpClient from "../../../api/axios";
import useAnnouncements from "../../../hooks/useAnnouncements";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateAnnouncements = () => {
  const { user } = useProfile();
  const { refresh } = useAnnouncements();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    adminId: "",
  });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await httpClient
      .post("/dashboard/create-announcements", {
        title: formData.title,
        content: formData.content,
        adminId: user?._id,
      })
      .then(({ data }) => {
        console.log(data);
        toast.success("Announcement created successfully");
        navigate("/admin");
        refresh();
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    const { target } = event;
    const { id, value } = target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="">
      <div className="flex flex-col px-8 pt-6 pb-8 mb-4 bg-white rounded-md shadow-md">
        <h2 className="mb-2 text-lg font-bold">Create Announcement</h2>
        <form className="mt-2" onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleChange(e)}
              className="w-full p-3 leading-tight text-gray-700 capitalize border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter the announcement title"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Content:
            </label>
            <textarea
              id="content"
              rows="5"
              value={formData.content}
              onChange={(e) => handleChange(e)}
              className="w-full p-3 leading-tight text-gray-700 capitalize border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter the announcement content"
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              htmlFor="admin_id"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Admin ID:
            </label>
            <input
              type="text"
              id="adminId"
              value={user ? user?._id : formData.adminId}
              className="w-full p-3 leading-tight text-gray-700 capitalize border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter your admin ID"
              readOnly
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-primary focus:outline-none focus-shadow-outline"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncements;
