import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Error desconocido");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f0e1] text-[#1e1e1e]">
            <div className="flex flex-col items-center bg-white p-10 rounded-4xl">
            <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64 ">
                <input
                    type="email"
                    placeholder="Email"
                    className="p-2 rounded text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="p-2 rounded text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-500 p-2 rounded font-bold cursor-pointer"
                >
                    Entrar
                </button>
            </form>
            </div>
            <Link to="/register" className="mt-4 text-amber-600 hover:underline">
                ¿No tenés cuenta? Registrate
            </Link>
        </div>
    );
}
