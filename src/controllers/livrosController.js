import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores, livros} from "../models/index.js";

class LivroController {
    static getLivros = async (req, res, next) => {
        try {
            const buscaLivros = livros.find().populate("autor");
            req.resultado = buscaLivros;
            next();
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

    static getLivrosByFilter = async (req, res, next) => {
        const {editora, title, minPag, maxPag, nomeAutor} = req.query;

        try {
            let busca = {};
            if(editora) busca.editora = editora;
            if(title) busca.title = { $regex: title, $options: "i"};
            if(maxPag) busca.numPag = { ...busca.numPag, $lte: maxPag};
            if(minPag) busca.numPag = { ...busca.numPag, $gte: minPag};
            if(nomeAutor) {
                const autor = await autores.findOne({ nome: nomeAutor});

                if (autor != null ){
                    busca.autor = autor._id;
                } else {
                    busca = null;
                }
            }
            const livrosResultados = livros.find(busca).populate("autor");

            req.resultado = livrosResultados;

            if(busca != null)
                next();
            else
                res.status(200).send([]);
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