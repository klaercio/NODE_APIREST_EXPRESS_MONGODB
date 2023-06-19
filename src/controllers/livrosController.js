import livros from "../models/livro.js";

class LivroController {
    static getLivros = async (req, res) => {
        try {
            const livrosResultado = await livros.find().populate("autor");
            res.status(200).json(livrosResultado);
        }catch(err) {
            res.status(500).send({message: `${err.message} - Erro no get livros`});
        }
    };

    static getLivroId = async (req, res) => {
        const {id} = req.params;

        try {
            const livrosResultados = await livros.findById(id)   .populate("autor", "nome");
            res.status(200).send(livrosResultados);
        }catch(err) {
            res.status(400).send({message: ` ${err} - ${id} não encontrado`});
        }
    };

    static getLivrosByEditora = async (req, res) => {
        const {editora} = req.query;

        try {
            const livrosResultados = await livros.find({"editora": editora}).populate("autor");
            res.status(200).json(livrosResultados);
        }catch(err) {
            res.status(400).send({message: err.message});
        }
    };

    static postLivro = async (req, res) => {
        let livro = new livros(req.body);

        try {
            await livro.save();
            res.status(201).send(livro.toJSON()); 
        }catch(err) {
            res.status(500).send({message: `${err.message} - Falha ao cadastrar livro`});
        }
    };

    static putLivro = async (req, res) => {
        const {id} = req.params;

        try {
            await livros.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "Livro atualizado com sucesso!"});
        }catch(err) {
            res.status(500).send({message: err.message});
        }
    };

    static deleteLivro = async (req, res) => {
        const {id} = req.params;

        try {
            await livros.findByIdAndDelete(id);
            res.status(200).send("Livro excluído com sucesso!!!");
        }catch(err) {
            res.status(500).send({message: `${err.message}`});
        }
    };
}

export default LivroController;