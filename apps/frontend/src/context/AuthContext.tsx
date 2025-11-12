import { useState, useEffect, type ReactNode } from "react";
import { loginUser, registerUser } from "../services/authApi";
import { AuthContext } from "../hooks/useAuth";

type User = { name: string; role: "ADMIN" | "CLIENT" };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        const { token, user } = await loginUser({ email, password });
        setToken(token);
        setUser(user)
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const register = async (name: string, email: string, password: string) => {
        await registerUser({ name, email, password });
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

