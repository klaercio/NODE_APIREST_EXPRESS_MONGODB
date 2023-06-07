import express, { json } from 'express';

const app = express();

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

export default app;