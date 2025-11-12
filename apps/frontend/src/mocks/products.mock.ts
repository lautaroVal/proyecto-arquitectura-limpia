import type { Product } from "../../../../domain/dist/entities";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Burger Clásica",
    price: 1500,
    available: true,
    type: "BURGER",
    image: "/products-images/Classic-Burger.jpg",
  },
  {
    id: "2",
    name: "Cheeseburger",
    price: 1700,
    available: true,
    type: "BURGER",
    image: "/products-images/Cheeseburger.jpg",
  },
  {
    id: "3",
    name: "Coca-Cola",
    price: 800,
    available: true,
    type: "DRINK",
    image: "/products-images/Coca-Cola.jpg",
  },
];
