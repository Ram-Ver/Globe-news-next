import { LoginPayload, LoginResponse } from "@/typescript/interfaces/api";
import api from "../axios";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", payload);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};
