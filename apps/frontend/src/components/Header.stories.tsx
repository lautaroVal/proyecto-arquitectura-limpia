import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import { expect, within } from "storybook/test";
import { MemoryRouter } from "react-router-dom";
import { MockAuthProvider } from "../mocks/authProvider.mock";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story, context: { args: { user?: { name: string; role: "ADMIN" | "CLIENT" } | null; token?: string | null } }) => (
      <MemoryRouter>
        <MockAuthProvider user={context.args.user} token={context.args.token}>
          <Story />
        </MockAuthProvider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    user: null,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    expect(canvas.queryByText(/lautaro/i)).not.toBeInTheDocument();
  },
};

export const ClienteLogueado: Story = {
  args: {
    user: {
      name: "Lautaro",
      role: "CLIENT",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/lautaro/i)).toBeInTheDocument();
    expect(canvas.queryByText(/órdenes/i)).not.toBeInTheDocument();
    const orderButton = canvas.getByRole("link", { name: /pedidos/i });
    expect(orderButton).toBeInTheDocument();
  },
};

export const AdministradorLogueado: Story = {
  args: {
    user: {
      name: "Admin Burger",
      role: "ADMIN",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/admin burger/i)).toBeInTheDocument();
    const adminPanel = canvas.getByText(/órdenes/i);
    expect(adminPanel).toBeInTheDocument();
    expect(canvas.queryByText(/login/i)).not.toBeInTheDocument();
  },
};
