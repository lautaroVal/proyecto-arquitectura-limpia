import type { Meta, StoryObj } from "@storybook/react-vite";
import Home from "./Home.js";
import { MemoryRouter } from "react-router-dom";

const meta = {
    title: "components/Home",
    component: Home,
    decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ]
} satisfies Meta<typeof Home>

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
}