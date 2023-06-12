import express, { json } from 'express';

const app = express();

app.use(express.json());

const livros = [
    {
        id: 1,
        'title': 'Avatar'
    }, 
    {
        id: 2,
        'title': 'Interinstelar'
    }
];

app.get('/', (req, res) => { 
    res.status(200).send('Curso de node');
});

app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro Cadastrado com sucesso!!');
})

export default app;