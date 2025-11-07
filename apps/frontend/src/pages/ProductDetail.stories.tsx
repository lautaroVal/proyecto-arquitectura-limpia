import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import ProductDetail from "./ProductDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { mockProducts } from "../mocks/products.mock";

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
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("http://localhost:3000/api/products/getProductById/4", async () => {
         return new Promise(() => {})
    }),
      ],
    },
    initialPath: "/products/4",
  },
};
