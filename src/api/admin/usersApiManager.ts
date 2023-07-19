import apiManager from "../apiServiceManager.service";

export const fetchUsers = async (params: object) => {
  const response = await apiManager.get(
    "users",
    {
      params
    }
  );
  return response.data;
};
export const changeUserStatus = async (id: number, status: any) => {
  const response = await apiManager.post(
    `users/${id}/change-status`,
    status
  );
  return response.data;
};