export default function Hero() {
  return (
    <section className="relative bg-[#1e1e1e] text-white py-16 md:py-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#ffc300]">
            ¡La mejor hamburguesa artesanal te espera!
          </h2>
          <p className="text-lg text-[#f5f0e1]">
            Ingredientes frescos, pan casero y un sabor que te hará volver.
          </p>
          <a
            href="#products"
            className="inline-block bg-[#bb4d00] hover:bg-[#bb4d00]/90 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
          >
            Ver menú
          </a>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349"
            alt="Hamburguesa artesanal"
            className="rounded-2xl shadow-2xl w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
