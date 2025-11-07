import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductList />
      </main>
      <Footer />
    </>
  );
}
