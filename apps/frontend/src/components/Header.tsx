export default function Header() {
  return (
    <header className="py-5 px-6 md:px-12 flex justify-between items-center bg-gray-900 shadow-xl text-white">
      
      <h1 className="text-3xl font-extrabold tracking-tight text-amber-500 cursor-pointer"><a href="/">Burger</a>
      </h1>

      <nav className="hidden md:flex items-center space-x-6">
        <ul className="flex items-center space-x-6">
          
          <li className="text-gray-300 hover:text-amber-500 transition duration-300 cursor-pointer">
            <a href="/">Pedidos</a>
          </li>
          <li className="text-gray-300 hover:text-amber-500 transition duration-300 cursor-pointer">
            <a href="/">Contacto</a>
          </li>
          
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
        </ul>
      </nav>

      {/* <div className="md:hidden">
          <button className="text-white">☰</button>
      </div> */}
    </header>
  )
}
