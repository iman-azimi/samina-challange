import apiManager from "./apiServiceManager.service";

// States End Point

export const getStates = async (i) => {
  const response = await apiManager.get(`states`);
  return response.data;
};

// Cities End Point

export const getCities = async (id: number) => {
  const response = await apiManager.get(`states/${id}/cities?sort_column=id`);
  return response.data;
};
