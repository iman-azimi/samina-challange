import apiManager from "./apiServiceManager.service";

export const getCompleteInformation = async () => {
  const response = await apiManager.get("information");
  return response.data;
};

export const editProfile = async (user: object) => {
  const response = await apiManager.put("set-complete-data", user);
  return response.data;
};

export const sendAddress= async (address: object) => {
  const response = await apiManager.post("information/address", address);
  return response.data;
};


export const sendCompleteInformation= async (information: object) => {
  const response = await apiManager.post("information/information_complete", information);
  return response.data;
};


export const sendDocuments= async (information: object) => {
  const response = await apiManager.post("information/upload_document", information);
  return response.data;
};
