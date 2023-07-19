import apiManager from "./apiServiceManager.service";

export const createAdvertise = async (adver: object) => {
  
  const response = await apiManager.post(
    "advertise",
    adver
  );
  return response.data;
};


export const fetchMyAdvertiseList = async (params) => {  
  const response = await apiManager.get(
    "advertise/my-list",
    {
      params
    }
  );

  return response.data;
};



export const deleteAdvertise = async (id: number) => {  
  const response = await apiManager.delete(
    `advertise/${id}`
  );

  return response.data;
};


export const fetchAllAdvertise = async () => {  
  const response = await apiManager.get(
    `advertise`
  );

  return response.data;
};
