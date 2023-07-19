import apiManager from "../apiServiceManager.service";


export const fetchAds = async () => {
  const response = await apiManager.get(
    "ads"
  );
  return response.data;
};
export const createNewsAds = async (ads: any) => {
  const response = await apiManager.post(
    "ads",
    ads
  );
  return response.data;
};

export const showAds= async (id: number) => {
  const response = await apiManager.get(
    `ads/${id}`
  );
  return response.data;
};

export const editAds= async (id: number, ads: object) => {
  const response = await apiManager.put(
    `ads/${id}`,
    ads

  );
  return response.data;
};
export const deleteAds= async (id: number) => {
  const response = await apiManager.delete(
    `ads/${id}`
  );
  return response.data;
};