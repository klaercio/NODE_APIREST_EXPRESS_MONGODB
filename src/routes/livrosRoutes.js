import express  from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
    .get("/livros", LivroController.getLivros)
    .post("/livros", LivroController.postLivro)
    .put("/livros/:id", LivroController.putLivro)


export default router;