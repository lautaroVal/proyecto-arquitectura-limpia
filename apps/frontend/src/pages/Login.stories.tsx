import type { Meta, StoryObj } from "@storybook/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

const meta: Meta<typeof Login> = {
  title: "components/Login",
  component: Login,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthProvider>
          <div style={{ minHeight: "100vh", background: "#f5f0e1", padding: "2rem" }}>
            <Story />
          </div>
        </AuthProvider>
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
