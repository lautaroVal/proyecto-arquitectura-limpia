import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import ProductDetail from "./ProductDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { mockProducts } from "../mocks/products.mock";
import { expect, userEvent, within } from "storybook/test";

const meta = {
  title: "components/ProductDetail",
  component: ProductDetail,
  decorators: [
    (Story, context) => {
      const initialPath = context.parameters.initialPath || "/products/1";
      return (
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route path="/products/:id" element={<Story />} />
          </Routes>
        </MemoryRouter>
      );
    },
  ],
} satisfies Meta<typeof ProductDetail>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:3000/api/products/getProductById/1", () =>
          HttpResponse.json(mockProducts[0])
        ),
      ],
    },
    initialPath: "/products/1",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Esperar que se muestre el nombre del producto
    const name = await canvas.findByText(mockProducts[0].name);
    expect(name).toBeInTheDocument();

    // Verificar que aparezca el precio
    const price = canvas.getByTestId("product-price");
    expect(price).toHaveTextContent(mockProducts[0].price.toString());

    // Simular interacción (ejemplo: botón agregar al carrito)
    const addBtn = canvas.getByRole("button", { name: /agregar/i });
    await userEvent.click(addBtn);
    // Podrías verificar un mensaje o cambio en el botón
    // expect(canvas.getByText(/añadido/i)).toBeInTheDocument();
  },
};

// 🔴 Estado de error del servidor
export const ServerError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:3000/api/products/getProductById/2", () =>
          HttpResponse.error()
        ),
      ],
    },
    initialPath: "/products/2",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Esperar mensaje de error
    const error = await canvas.findByTestId("error");
    expect(error).toHaveTextContent(/no se pudo cargar el producto/i);
  },
};

// 🕒 Estado de carga (fetch que nunca resuelve)
export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:3000/api/products/getProductById/4", async () => {
          return new Promise(() => {}); // nunca resuelve → simula carga infinita
        }),
      ],
    },
    initialPath: "/products/4",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verifica que aparezca el loader o mensaje de carga
    const loading = await canvas.findByTestId("loading");
    expect(loading).toHaveTextContent(/cargando/i);
  },
};
