import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import {autores, livros} from "../models/index.js";

class LivroController {
    static getLivros = async (req, res, next) => {
        try {

            const {limite = 1, pagina = 1, ordenacao = "title:1"} = req.query;

            let [campoOrdenacao, ordem] = ordenacao.split(":");

            const livrosResultado = await livros.find()
                .sort({[campoOrdenacao]: ordem})
                .skip((pagina-1) * limite)
                .limit(limite)
                .populate("autor");

            if (limite < 1 || pagina < 1)  {
                next(new RequisicaoIncorreta());
            } else {
                res.status(200).json(livrosResultado);
            }
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
            const livrosResultados = await livros.find(busca).populate("autor");

            if(busca != null)
                res.status(200).json(livrosResultados);
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