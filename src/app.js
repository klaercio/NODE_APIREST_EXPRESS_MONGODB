import express, { json } from 'express';
import db from './config/dbConnect.js';
import livros from './models/livro.js';
import routes from './routes/index.js';

db.on("error", console.log.bind(console, "Error de conexão"));
db.once("open", () => {
    console.log("Conexão com o banco realizada com sucesso!");
})

const app = express();

app.use(express.json());

routes(app);

app.get('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    res.json(livros[index]);
})

/* app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro Cadastrado com sucesso!!');
}); */

app.put('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    livros[index].title = req.body.title;
    res.json(livros);
})

app.delete('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivro(id);
    livros.splice(index, 1);
    res.send(`Livro ${id} removido com sucesso!`);
})

function buscaLivro(id){
    return livros.findIndex(livro => livros.id == id);
}


export default app;