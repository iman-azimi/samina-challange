import apiManager from "./apiServiceManager.service";

import type {
  GenericResponse,
  ILoginInput,
  ILoginResponse,
  ISignUpInput,
  IVerifyInput,
} from "../types/auth";

export const signUpUserFn = async (user: ISignUpInput) => {
  const response = await apiManager.post<GenericResponse>(
    "auth/register",
    user
  );
  return response.data;
};
export const verifyUserFn = async (params: IVerifyInput) => {
  const response = await apiManager.post<GenericResponse>(
    "auth/verify",
    params
  );
  return response.data;
};
export const loginUserFn = async (user: ILoginInput) => {
  const response = await apiManager.post<ILoginResponse>("auth/login", user);
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await apiManager.post<GenericResponse>("auth/logout");
  return response.data;
};
export const getProfileFn = async () => {
  const response = await apiManager.get<GenericResponse>("/profile");
  return response.data;
};

/// Admin Auth Api

export const loginAdminFn = async (user: ILoginInput) => {
  const response = await apiManager.post<ILoginResponse>("auth/login", user);
  return response.data;
};
export const getAdminProfileFn = async () => {
  const response = await apiManager.get<GenericResponse>("profile");
  return response.data;
};