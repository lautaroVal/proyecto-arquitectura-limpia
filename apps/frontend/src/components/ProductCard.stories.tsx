import type { Meta, StoryObj } from "@storybook/react-vite";
import ProductCard from "./ProductCard.js";
import { MemoryRouter } from "react-router-dom";
import { mockProducts } from "../mocks/products.mock.js";

const meta = {
    title: "components/ProductCard",
    component: ProductCard,
    decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ]
} satisfies Meta<typeof ProductCard>

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        product: mockProducts[0]
    }
}