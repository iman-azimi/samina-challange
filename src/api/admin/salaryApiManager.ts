import apiManager from "../apiServiceManager.service";

export const fetchSalaries = async (params: object) => {
  const response = await apiManager.get(
    "salaries",
    {
      params: params,
    }
  );
  return response.data;
};

export const createSalaries = async (salary: object) => {
  const response = await apiManager.post(
    "salaries",
    salary
  );
  return response.data;
};
export const editSalaries = async (id: number, salary: object) => {
  const response = await apiManager.put(
    `salaries/${id}`,
    salary
  );
  return response.data;
};
export const showSalaries = async (id: number) => {
  const response = await apiManager.get(
    `salaries/${id}`
  );
  return response.data;
};
export const deleteSalaries = async (id: number) => {
  const response = await apiManager.delete(
    `salaries/${id}`
  );
  return response.data;
};