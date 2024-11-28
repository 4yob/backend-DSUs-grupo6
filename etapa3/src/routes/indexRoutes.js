import { Router } from "express";
import cadastroRoutes from "./cadastroRoutes.js";

const rotas = Router();

rotas.get("/", (req, res) => {
  res.status(200).send("Servidor rodando e pronto para uso!");
});

rotas.use("/", cadastroRoutes);

export default rotas;
