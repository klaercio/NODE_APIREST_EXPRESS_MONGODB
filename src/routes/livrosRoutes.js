import express  from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
    .get("/livros", LivroController.getLivros, paginar)
    .get("/livros/busca", LivroController.getLivrosByFilter, paginar)
    .get("/livros/:id", LivroController.getLivroId)
    .post("/livros", LivroController.postLivro)
    .put("/livros/:id", LivroController.putLivro)
    .delete("/livro/:id", LivroController.deleteLivro);

export default router;