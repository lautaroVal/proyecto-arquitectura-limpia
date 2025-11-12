import { describe, test, expect, vi, beforeEach } from "vitest";
import { loginUser, registerUser, type AuthResponse } from "./authApi";

const API_URL = "http://localhost:3000/api/auth";

describe("authApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("loginUser", () => {
    test("should return the token and the user in case of success", async () => {
      const mockResponse: AuthResponse = {
        token: "mockToken123",
        user: {
          name: "Lautaro",
          role: "CLIENT",
        },
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const credentials = { email: "lautaro@gmail.com", password: "123456" };
      const result = await loginUser(credentials);

      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      expect(result).toEqual(mockResponse);
    });

     test("should throw an error if the response is not ok", async () => {
      const errorMessage = "Invalid credentials";

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: errorMessage }),
      } as Response);

      const credentials = { email: "fail@test.com", password: "wrong" };

      await expect(loginUser(credentials)).rejects.toThrow(errorMessage);
    });

    test("should throw a generic error if the body does not have a message", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);

      await expect(
        loginUser({ email: "test@test.com", password: "123" })
      ).rejects.toThrow("Error logging in");
    });
  });

  describe("registerUser", () => {
    test("should perform the registration correctly", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      const data = { name: "Lautaro", email: "new@test.com", password: "123" };

      await registerUser(data);

      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    });

    test("should throw an error if the response is not ok", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "Error while registering" }),
      } as Response);

      const data = { name: "Fail", email: "fail@test.com", password: "123" };

      await expect(registerUser(data)).rejects.toThrow("Error while registering");
    });

    test("should throw a generic error if the body does not have a message", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);

      const data = { name: "Lautaro", email: "test@test.com", password: "123" };

      await expect(registerUser(data)).rejects.toThrow("Error while registering");
    });
  }); 
});
