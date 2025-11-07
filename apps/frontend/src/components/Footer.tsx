export default function Footer() {
  return (
    <footer className="bg-[#1e1e1e] text-[#f5f0e1] py-10 px-6 md:px-12 border-t border-[#bb4d00]/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl font-extrabold text-[#ffc300] mb-3">Burger</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Las mejores hamburguesas artesanales, hechas con ingredientes frescos, pan casero y amor por el sabor.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#bb4d00] mb-3">Enlaces</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-[#ffc300] transition-colors duration-300"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="/productos"
                className="hover:text-[#ffc300] transition-colors duration-300"
              >
                Productos
              </a>
            </li>
            <li>
              <a
                href="/contacto"
                className="hover:text-[#ffc300] transition-colors duration-300"
              >
                Contacto
              </a>
            </li>
            <li>
              <a
                href="/sobre-nosotros"
                className="hover:text-[#ffc300] transition-colors duration-300"
              >
                Sobre nosotros
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-[#bb4d00] mb-3">Contacto</h3>
          <ul className="space-y-2 text-gray-400">
            <li>📍 Av. Sabor 123, Buenos Aires</li>
            <li>📞 +54 9 11 5555-1234</li>
            <li>✉️ contacto@burger.com</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-[#ffc300] transition duration-300">
              🟡 Facebook
            </a>
            <a href="#" className="hover:text-[#ffc300] transition duration-300">
              🟠 Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#bb4d00]/30 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Burger — Todos los derechos reservados.
      </div>
    </footer>
  );
}
