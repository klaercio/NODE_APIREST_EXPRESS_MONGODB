import livros from "../models/livro.js";

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
            const livrosResultados = await livros.findById(id)   .populate("autor", "nome");
            res.status(200).send(livrosResultados);
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
            await livros.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "Livro atualizado com sucesso!"});
        }catch(err) {
            next(err);
        }
    };

    static deleteLivro = async (req, res, next) => {
        const {id} = req.params;

        try {
            await livros.findByIdAndDelete(id);
            res.status(200).send("Livro excluído com sucesso!!!");
        }catch(err) {
            next(err);
        }
    };
}

export default LivroController;