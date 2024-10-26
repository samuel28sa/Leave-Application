import React from "react";

const CreateAnnouncements = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-orange-500 mb-6 text-center">
          Create Announcement
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-orange-200 font-medium mb-2"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the announcement title"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-orange-200 font-medium mb-2"
            >
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              rows="5"
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the announcement content"
              required
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              htmlFor="admin_id"
              className="block text-orange-200 font-medium mb-2"
            >
              Admin ID:
            </label>
            <input
              type="text"
              id="admin_id"
              name="admin_id"
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your admin ID"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncements;
