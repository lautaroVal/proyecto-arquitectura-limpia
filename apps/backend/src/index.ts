import cors from "cors";
import express from "express";
import routes from './routes/index.js';
import { PrismaClient } from "./generated/prisma";


export const app = express()
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json())
app.use(routes);

export const prisma = new PrismaClient();

app.listen(PORT, () => console.log(`Server Backend listening on https://localhost:${PORT}`))

// Manejo centralizado de errores --> app.use(errorHandler) --> import { errorHandler } from "./middlewares/errorHandler";

export default app;