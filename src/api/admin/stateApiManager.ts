import apiManager from "../apiServiceManager.service";

export const fetchStates = async () => {
  const response = await apiManager.get(
    "states"
  );
  return response.data;
};

export const createStates = async (state: any) => {
  const response = await apiManager.post(
    "states",
    state
  );
  return response.data;
};

export const deleteStates = async (id: number) => {
  const response = await apiManager.delete(
    `states/${id}`
  );
  return response.data;
};

export const editStates = async (state: any, id: number) => {
  const response = await apiManager.put(
    `states/${id}`,
    state
  );
  return response.data;
};



/// Cities End Point
export const fetchCities = async (id: number) => {
  const response = await apiManager.get(
    `states/${id}/cities`
  );
  return response.data;
};

export const createCities = async (city: any, id:number) => {
  const response = await apiManager.post(
    `states/${id}/cities`,
    city
  );
  return response.data;
};

export const deleteCities = async (StateId: number,cityId: number) => {
  const response = await apiManager.delete(
    `states/${StateId}/cities/${cityId}`
  );
  return response.data;
};

export const editCities = async (city: object, StateId: number,cityId: number)  => {
  const response = await apiManager.put(
    `states/${StateId}/cities/${cityId}`,
    city
  );
  return response.data;
};


/// Areas End Point

export const fetchAreas = async (id: number) => {
  const response = await apiManager.get(
    `cities/${id}/areas`
  );
  return response.data;
};

export const createAreas = async (city: any, id:number) => {
  const response = await apiManager.post(
    `cities/${id}/areas`,
    city
  );
  return response.data;
};

export const deleteAreas = async (cityId: number,areaId: number) => {
  const response = await apiManager.delete(
    `cities/${cityId}/areas/${areaId}`
  );
  return response.data;
};

export const editAreas = async (city: object, cityId: number,areaId: number)  => {
  const response = await apiManager.put(
    `cities/${cityId}/areas/${areaId}`,
    city
  );
  return response.data;
};