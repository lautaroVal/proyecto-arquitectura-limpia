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

    const name = await canvas.findByText(mockProducts[0].name);
    expect(name).toBeInTheDocument();

    const price = canvas.getByTestId("product-price");
    expect(price).toHaveTextContent(mockProducts[0].price.toString());

    const addBtn = canvas.getByRole("button", { name: /agregar/i });
    await userEvent.click(addBtn);
  },
};


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

    const error = await canvas.findByTestId("error");
    expect(error).toHaveTextContent(/no se pudo cargar el producto/i);
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:3000/api/products/getProductById/4", async () => {
          return new Promise(() => {}); 
        }),
      ],
    },
    initialPath: "/products/4",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const loading = await canvas.findByTestId("loading");
    expect(loading).toHaveTextContent(/cargando/i);
  },
};
