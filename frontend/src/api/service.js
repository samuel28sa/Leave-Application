import httpClient from "./axios";

export const getProfile = async () => {
  const { data } = await httpClient.get(`/user/profile`);
  return data;
};

export const getAnnouncements = async () => {
  const { data } = await httpClient.get("/dashboard/announcements");
  return data;
};

export const getDashboardStats = async () => {
  const { data } = await httpClient.get("/dashboard/stats");
  return data;
};

export const getLeaveRequests = async (userId) => {
  const response = await httpClient.get(`/leave/${userId}`);
  return response.data;
};
