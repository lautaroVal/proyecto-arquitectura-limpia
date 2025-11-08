import type { Meta, StoryObj } from "@storybook/react";
import ProductList from "./ProductList";
import { http, HttpResponse } from 'msw'
import { mockProducts } from "../mocks/products.mock";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { expect, within, waitFor } from "storybook/test";


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


export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvas.getByText(/Burger Clásica/i)).toBeInTheDocument();
    });
    const items = canvas.getAllByRole("img");
    expect(items.length).toBe(3);
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/api/products/listProducts', () => {
          return HttpResponse.json([])
        })
      ]
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(
        canvas.getByText(/no hay productos disponibles/i)
      ).toBeInTheDocument();
    });
  },
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/cargando/i)).toBeInTheDocument();
  },
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(
        canvas.getByText(/verificá tu conexión/i)
      ).toBeInTheDocument();
    });
  },
};
