import type { Meta, StoryObj } from "@storybook/react-vite";
import Hero from "./Hero";

const meta = {
    title: "components/Hero",
    component: Hero,
} satisfies Meta<typeof Hero>

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
}