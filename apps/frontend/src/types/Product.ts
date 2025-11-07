export interface Product {
  id: string;
  name: string;
  price: number;
  available: boolean;
  type: "BURGER" | "DRINK" | "ACOMPANIMENT";
  image: string;
}
