import cors from "cors";
import express from "express";
import routes from './routes/index.js';
import { PrismaClient } from "../src/generated/prisma";
import path from "path";

export const app = express()
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:6006", "http://localhost:8081"]  ,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json())
app.use(routes);

app.use("/public", express.static(path.join(__dirname, "../public")));

export const prisma = new PrismaClient();
async function init() {
  await prisma.$connect();
  console.log("DB connected");
}
init();

app.listen(PORT, () => console.log(`Server Backend listening on https://localhost:${PORT}`))

// Manejo centralizado de errores --> app.use(errorHandler) --> import { errorHandler } from "./middlewares/errorHandler";

export default app;