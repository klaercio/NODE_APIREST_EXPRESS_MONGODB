import NaoEncontrado from "../erros/NaoEncontrado.js";
import {livros} from "../models/index.js";

class LivroController {
    static getLivros = async (req, res, next) => {
        try {
            const livrosResultado = await livros.find().populate("autor");
            res.status(200).json(livrosResultado);
        }catch(err) {
            next(err);
        }
    };

    static getLivroId = async (req, res, next) => {
        const {id} = req.params;

        try {
            const livrosResultados = await livros.findById(id).populate("autor", "nome");
            livrosResultados? res.status(200).send(livrosResultados): next(new NaoEncontrado("Id do livro não localizado"));
        }catch(err) {
            next(err);
        }
    };

    static getLivrosByEditora = async (req, res, next) => {
        const {editora} = req.query;

        try {
            const livrosResultados = await livros.find({"editora": editora}).populate("autor");
            res.status(200).json(livrosResultados);
        }catch(err) {
            next(err);
        }
    };

    static postLivro = async (req, res, next) => {
        let livro = new livros(req.body);

        try {
            await livro.save();
            res.status(201).send(livro.toJSON()); 
        }catch(err) {
            next(err);
        }
    };

    static putLivro = async (req, res, next) => {
        const {id} = req.params;

        try {
            const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});
            livroResultado? res.status(200).send({message: "Livro atualizado com sucesso!"}): next(new NaoEncontrado("Id do livro não encontrado"));
        }catch(err) {
            next(err);
        }
    };

    static deleteLivro = async (req, res, next) => {
        const {id} = req.params;

        try {
            const livroResultado = await livros.findByIdAndDelete(id);
            livroResultado? res.status(200).send({message: "Livro excluído com sucesso!"}): next(new NaoEncontrado("Id do livro não encontrado"));
        }catch(err) {
            next(err);
        }
    };
}

export default LivroController;