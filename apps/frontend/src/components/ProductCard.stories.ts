import type { Meta, StoryObj } from "@storybook/react-vite";
import ProductCard from "./ProductCard";

const meta = {
    title: "components/ProductCard",
    component: ProductCard,
} satisfies Meta<typeof ProductCard>

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        product: {
            id: "njn",
            name: "mkmnk",
            price: 1,
            available: true,
            type: "BURGER"
        }
    }
}