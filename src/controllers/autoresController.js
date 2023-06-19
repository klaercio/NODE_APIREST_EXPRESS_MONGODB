import autores from "../models/Autor.js";

class AutorController {
    static getAutores = async (req, res) => {
        try {
            const autoresResultado =  await autores.find();
            res.status(200).json(autoresResultado);
        }catch(err) {
            res.status(500).send({message: `${err.message} - Erro no getAutores`});
        }
    };

    static getAutorId = async (req, res) => {
        const {id} = req.params;

        try {
            const autoresResultado = await autores.findById(id);
            res.status(200).send(autoresResultado);
        }catch(err) {
            res.status(400).send({message: ` ${err.message} - ${id} não encontrado`});
        }
    };

    static postAutor = async (req, res) => {
        let autor = new autores(req.body);
        
        try {
            await autor.save();
            res.status(201).send(autor.toJSON());
        }catch(err) {
            res.status(500).send({message: `${err.message} - Falha ao cadastrar livro`});
        }
    };

    static putAutor = async (req, res) => {
        const {id} = req.params;

        try {
            await autores.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "Livro atualizado com sucesso!"});
        }catch(err) {
            res.status(500).send({message: err.message});
        }
    };

    static deleteAutor = async (req, res) => {
        const {id} = req.params;

        try {
            await autores.findByIdAndDelete(id);
            res.status(200).send("Autor excluído com sucesso!!!");
        }catch(err) {
            res.status(500).send({message: `${err.message}`});
        }
    };
}

export default AutorController;