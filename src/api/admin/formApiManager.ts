import apiManager from "../apiServiceManager.service";

export const fetchForms = async (params: object) => {
  const response = await apiManager.get(
    "forms",
    {
      params: params,
    }
  );
  return response.data;
};

export const createForms = async (form: object) => {
  const response = await apiManager.post(
    "forms",
    form
  );
  return response.data;
};
export const deleteForms = async (id: number) => {
  const response = await apiManager.delete(
    `forms/${id}`
  );
  return response.data;
};
export const editForms= async (form: object, id: number) => {
  const response = await apiManager.put(
    `forms/${id}`, form );
  return response.data;
};

export const showForms= async (id: number) => {
  const response = await apiManager.get(
    `forms/${id}`
  );
  return response.data;
};