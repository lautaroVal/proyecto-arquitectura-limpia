import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      setMessage("Registro exitoso. Ahora podés iniciar sesión.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Error desconocido");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f0e1] text-[#1e1e1e]">
      <div className="flex flex-col items-center bg-white p-10 rounded-4xl">
      <h2 className="text-2xl font-bold mb-4">Crear Cuenta</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
        <input
          type="text"
          placeholder="Nombre"
          className="p-2 rounded text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        {message && <p className="text-sm text-amber-400">{message}</p>}
        <button
          type="submit"
          className="bg-amber-600 hover:bg-amber-500 p-2 rounded font-bold cursor-pointer"
        >
          Registrarse
        </button>
      </form>
      </div>
      <Link to="/login" className="mt-4 text-amber-600 hover:underline">
        ¿Ya tenés cuenta? Iniciá sesión
      </Link>
    </div>
  );
}
