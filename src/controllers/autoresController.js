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
            autoresResultado? res.status(200).send(autoresResultado): res.status(404).send({message:`${id} não localizado`});
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
            await autores.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "Livro atualizado com sucesso!"});
        }catch(err) {
            next(err);
        }
    };

    static deleteAutor = async (req, res, next) => {
        const {id} = req.params;

        try {
            await autores.findByIdAndDelete(id);
            res.status(200).send("Autor excluído com sucesso!!!");
        }catch(err) {
            next(err);
        }
    };
}

export default AutorController;