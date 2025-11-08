import { useState } from "react";

export type HeaderProps = {
  user?: {
    name: string;
    role: "ADMIN" | "CLIENT";
  } | null;
};

export default function Header({ user }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="py-5 px-6 md:px-12 flex justify-between items-center bg-gray-900 shadow-xl text-white">
      <h1 className="text-3xl font-extrabold tracking-tight text-amber-500 cursor-pointer">
        <a href="/">Burger</a>
      </h1>

      <nav className="hidden md:flex items-center space-x-6 relative">
        <ul className="flex items-center space-x-6">

          {user?.role === "ADMIN" ? (
            <li className="text-gray-300 hover:text-amber-500 transition duration-300 cursor-pointer">
              <a href="/admin/orders">Órdenes</a>
            </li>
          ) : (
            <li className="text-gray-300 hover:text-amber-500 transition duration-300 cursor-pointer">
              <a href="/">Pedidos</a>
            </li>
          )}
          <li className="text-gray-300 hover:text-amber-500 transition duration-300 cursor-pointer">
            <a href="/">Contacto</a>
          </li>
          {!user && (
            <button
              className="
                bg-amber-700 
                hover:bg-amber-600 
                text-white 
                font-bold 
                py-2 
                px-5 
                rounded-full 
                shadow-lg 
                transition 
                duration-300 
                transform 
                hover:scale-105
                cursor-pointer
              "
            >
              Login
            </button>
          )}
          {user && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="
                  bg-amber-700 
                  hover:bg-amber-600 
                  text-white 
                  font-bold 
                  py-2 
                  px-5 
                  rounded-full 
                  shadow-lg 
                  transition 
                  duration-300 
                  transform 
                  hover:scale-105
                  cursor-pointer
                "
              >
                {user.name}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                    onClick={() => alert("Cerrar sesión")}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}


{/* <div className="md:hidden">
      <button className="text-white">☰</button>
  </div> */}