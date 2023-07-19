import apiManager from "../apiServiceManager.service";


export const fetchAdvertising = async (params: object) => {
  const response = await apiManager.get(
    "list-advertise",
    {
      params
    }
  );
  
  return response.data;
};

export const changeStatusAdvertising = async (params: object, id: number) => {
  const response = await apiManager.put(
    `change-status/${id}`, params

  );
  
  return response.data;
};
