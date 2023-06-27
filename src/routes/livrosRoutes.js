import express  from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
    .get("/livros", LivroController.getLivros)
    .get("/livros/busca", LivroController.getLivrosByFilter)
    .get("/livros/:id", LivroController.getLivroId)
    .post("/livros", LivroController.postLivro)
    .put("/livros/:id", LivroController.putLivro)
    .delete("/livro/:id", LivroController.deleteLivro);

export default router;