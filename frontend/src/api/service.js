import httpClient from "./axios";

export const getProfile = async () => {
  const { data } = await httpClient.get(`/user/profile`);
  return data;
};

export const getRequests = async (id) => {
  const { data } = await httpClient.get(`/leave-requests/${id}`);
  return data;
};

export const getAnnouncements = async () => {
  const { data } = await httpClient.get("/dashboard/announcements");
  return data;
};
