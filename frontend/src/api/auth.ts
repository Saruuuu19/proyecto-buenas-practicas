import { api } from "./client";

export interface LoginResponse {
  token: string;
  token_type: string;
  username: string;
}

export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    username,
    password,
  });
  return data;
}
