import type { Meta, StoryObj } from "@storybook/react";
import ProductList from "./ProductList";
import { http, HttpResponse } from 'msw'
import { mockProducts } from "../mocks/products.mock";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const meta = {
  title: "Components/ProductList",
  component: ProductList,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/api/products/listProducts', () => {
          return HttpResponse.json(mockProducts)
        })
      ]
    }
  }
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/api/products/listProducts', () => {
          return HttpResponse.json([])
        })
      ]
    }
  }
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/api/products/listProducts', async () => {
          return new Promise(() => { });
        })
      ]
    }
  }
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/api/products/listProducts', () => {
          return new HttpResponse(null, {
            status: 500,
            statusText: "Internal Server Error",
          });
        })
      ]
    }
  }
};
