import { AuthContext } from "../hooks/useAuth";

export const MockAuthProvider = ({
  user = null,
  token = null,
  children,
}: {
  user?: { name: string; role: "ADMIN" | "CLIENT" } | null;
  token?: string | null;
  children: React.ReactNode;
}) => {
  const mockAuth = {
    user,
    token,
    login: async () => { },
    register: async () => { },
    logout: () => console.log("Logout triggered"),
  };

  return <AuthContext.Provider value={mockAuth}>{children}</AuthContext.Provider>;
};