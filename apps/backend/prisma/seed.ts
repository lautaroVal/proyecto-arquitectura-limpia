import { Product, ProductType } from "../../../domain/src/entities/product";
import { PrismaClient } from "../src/generated/prisma";


const prisma = new PrismaClient();

async function main() {
  const products: Product[] = [
    {
      id: "1",
      name: "Classic Burger",
      price: 200,
      available: true,
      type: ProductType.BURGER,
      image: "/products-images/Classic-Burger.jpg"
    },
    {
      id: "2",
      name: "Cheeseburger",
      price: 220,
      available: true,
      type: ProductType.BURGER,
      image: "/products-images/Cheeseburger.jpg"
    },
    {
      id: "3",
      name: "Bacon Burger",
      price: 250,
      available: true,
      type: ProductType.BURGER,
      image: "/products-images/Bacon-Burger.jpg"
    },
    {
      id: "4",
      name: "Double Smash Burger",
      price: 280,
      available: true,
      type: ProductType.BURGER,
      image: "/products-images/Double-Smash-Burger.jpg"
    },
    {
      id: "5",
      name: "BBQ Burger",
      price: 260,
      available: true,
      type: ProductType.BURGER,
      image: "/products-images/BBQ-Burger.jpg"
    },
    {
      id: "6",
      name: "Veggie Burger",
      price: 230,
      available: true,
      type: ProductType.BURGER,
      image: "/products-images/Veggie-Burger.jpg"
    },
    {
      id: "7",
      name: "Coca-Cola",
      price: 100,
      available: true,
      type: ProductType.DRINK,
      image: "/products-images/Coca-Cola.jpg"
    },
    {
      id: "8",
      name: "Sprite",
      price: 100,
      available: true,
      type: ProductType.DRINK,
      image: "/products-images/Sprite.jpg"
    },
    {
      id: "9",
      name: "Agua Mineral",
      price: 90,
      available: true,
      type: ProductType.DRINK,
      image: "/products-images/smartwater.jpg"
    },
    {
      id: "10",
      name: "Papas Fritas Clásicas",
      price: 150,
      available: true,
      type: ProductType.ACOMPANIMENT,
      image: "/products-images/Papas-Fritas-Clásicas.jpg"
    },
    {
      id: "11",
      name: "Aros de Cebolla",
      price: 170,
      available: true,
      type: ProductType.ACOMPANIMENT,
      image: "/products-images/Aros-de-Cebolla.jpg"
    },
    {
      id: "12",
      name: "Bastones de Mozzarella",
      price: 180,
      available: true,
      type: ProductType.ACOMPANIMENT,
      image: "/products-images/Bastones-de-Mozzarella.jpg"
    },
  ];

  console.log("🌱 Seeding products...");

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product,
    });
  }

  console.log("✅ Seed completado correctamente!");
}

main()
  .catch((e) => {
    console.error("❌ Error durante el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
