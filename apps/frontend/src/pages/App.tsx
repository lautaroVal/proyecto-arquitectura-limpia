import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Header from "../components/Header";
import Home from "./Home"
import Footer from "../components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

