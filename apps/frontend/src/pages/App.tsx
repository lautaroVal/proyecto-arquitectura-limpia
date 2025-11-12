import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Header from "../components/Header";
import Home from "./Home"
import Footer from "../components/Footer";
import Login from "./Login";
import Register from "./Register";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

