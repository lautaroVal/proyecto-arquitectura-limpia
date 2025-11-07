import type { Meta, StoryObj } from "@storybook/react-vite";
import ProductList from "./ProductList";

const meta = {
    title: "components/ProductList",
    component: ProductList,
} satisfies Meta<typeof ProductList>

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
}