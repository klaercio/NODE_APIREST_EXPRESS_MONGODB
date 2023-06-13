import livros from "../models/livro.js";

class LivroController {
    static getLivros = (req, res) => {
        livros.find()
        .populate('autor')
        .exec((err, livros) => {
            res.status(200).json(livros);
        })
    }

    static getLivroId = (req, res) => {
        const {id} = req.params;
        livros.findById(id)
              .populate('autor', 'nome')
              .exec((err, livros) => {
                    if(!err) {
                        res.status(200).send(livros);
                    } else {
                        res.status(400).send({message: ` ${err} - ${id} não encontrado`});
                    }
        });
    }

    static getLivrosByEditora = (req, res) => {
        const editora = req.query.editora;

        livros.find({"editora": editora})
        .populate('autor')
        .exec((err, livros) => {
            if(!err)
                res.status(200).json(livros);
            else
                res.status(400).send({message: err.message});
        })
    }

    static postLivro = (req, res) => {
        let livro = new livros(req.body)
        livro.save((err) => {
            if(err) {
                res.status(500).send({message: `${err.message} - Falha ao cadastrar livro`});
            } else {
                res.status(201).send(livro.toJSON()); 
            }
        })
    }

    static putLivro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({message: "Livro atualizado com sucesso!"});
            } else {
                res.status(500).send({message: err.message});
            }
        })
    }

    static deleteLivro = (req, res) => {
        const {id} = req.params;

        livros.findByIdAndDelete(id, (err) => {
            if(!err) {
                res.status(200).send("Livro excluído com sucesso!!!");
            } else {
                res.status(500).send({message: `${err.message}`})
                console.log(id)
            }
        })
    }
}

export default LivroController;