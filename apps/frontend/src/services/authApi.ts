import type { userRol } from "../../../../domain/dist/entities";

const API_URL = import.meta.env.VITE_API_URL || "http://backend:3000";

export type AuthResponse = {
  token: string,
  user: {
    name: string,
    role: userRol
  }
};
export type UserCredentials = { email: string; password: string };
export type RegisterData = UserCredentials & { name: string };

export async function loginUser(credentials: UserCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error logging in");
  }

  return response.json();
}

export async function registerUser(data: RegisterData): Promise<void> {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error while registering");
  }
}
