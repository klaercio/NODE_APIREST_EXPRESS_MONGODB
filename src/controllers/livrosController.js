import livros from "../models/livro.js";

class LivroController {
    static getLivros = (req, res) => {
        livros.find((err, livros) => {
            res.status(200).json(livros);
        })
    }

    static postLivro = (req, res) => {
        let livro = new livros(req.body)
        livro.save((err) => {
            if(err) {
                res.status(500).send({message: `${err.message} - Falha ao cadastrar livro`})
            } else {
                res.status(201).send(livro.toJSON()); 
            }
        })
    }

    static putLivro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({message: "Livro atualizad com sucesso!"})
            } else {
                res.status(500).send({message: err.message})
            }
        })

    }
}

export default LivroController;