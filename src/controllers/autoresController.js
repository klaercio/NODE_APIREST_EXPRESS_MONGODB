import autores from "../models/Autor.js";

class AutorController {
    static getAutores = (req, res) => {
        autores.find((err, autores) => {
            res.status(200).json(autores);
        })
    }

    static getAutorId = (req, res) => {
        const {id} = req.params;
        autores.findById(id, (err, autores) => {
            if(!err) {
                res.status(200).send(autores);
            } else {
                res.status(400).send({message: ` ${err} - ${id} não encontrado`});
            }
        })
    }

    static postAutor = (req, res) => {
        let autor = new autores(req.body)
        autor.save((err) => {
            if(err) {
                res.status(500).send({message: `${err.message} - Falha ao cadastrar livro`});
            } else {
                res.status(201).send(autor.toJSON()); 
            }
        })
    }

    static putAutor = (req, res) => {
        const id = req.params.id;

        autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({message: "Livro atualizado com sucesso!"});
            } else {
                res.status(500).send({message: err.message});
            }
        })
    }

    static deleteAutor = (req, res) => {
        const {id} = req.params;

        autores.findByIdAndDelete(id, (err) => {
            if(!err) {
                res.status(200).send("Autor excluído com sucesso!!!");
            } else {
                res.status(500).send({message: `${err.message}`})
                console.log(id)
            }
        })
    }
}

export default AutorController;