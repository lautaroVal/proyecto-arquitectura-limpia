import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    user: null,
  },
};

export const ClienteLogueado: Story = {
  args: {
    user: {
      name: "Lautaro",
      role: "CLIENT",
    },
  },
};

export const AdministradorLogueado: Story = {
  args: {
    user: {
      name: "Admin Burger",
      role: "ADMIN",
    },
  },
};
