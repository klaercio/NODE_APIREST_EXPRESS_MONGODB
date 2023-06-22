import NaoEncontrado from "../erros/NaoEncontrado.js";
import autores from "../models/Autor.js";

class AutorController {
    static getAutores = async (req, res, next) => {
        try {
            const autoresResultado =  await autores.find();
            res.status(200).json(autoresResultado);
        }catch(err) {
            next(err);
        }
    };

    static getAutorId = async (req, res, next) => {
        const {id} = req.params;

        try {
            const autoresResultado = await autores.findById(id);
            autoresResultado? res.status(200).send(autoresResultado): next(new NaoEncontrado("ID do autor não encontrado"));
        }catch(err) {
            next(err);
        }
    }; 

    static postAutor = async (req, res, next) => {
        let autor = new autores(req.body);
        
        try {
            await autor.save();
            res.status(201).send(autor.toJSON());
        }catch(err) {
            next(err);
        }
    };

    static putAutor = async (req, res, next) => {
        const {id} = req.params;

        try {
            const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});
            autorResultado? res.status(200).send({message: "Livro atualizado com sucesso!"}): next(new NaoEncontrado("Id do autor não encontrado"));
        }catch(err) {
            next(err);
        }
    };

    static deleteAutor = async (req, res, next) => {
        const {id} = req.params;

        try {
            const autorResultado = await autores.findByIdAndDelete(id);
            autorResultado? res.status(200).send("Autor excluído com sucesso!!!"): next(new NaoEncontrado("ID do autor não encontrado"));
        }catch(err) {
            next(err);
        }
    };
}

export default AutorController;