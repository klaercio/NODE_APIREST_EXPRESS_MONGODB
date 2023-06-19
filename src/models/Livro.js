import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
    {
        id: {type: String},
        title: {type: String, required: true},
        autor: {type: mongoose.Schema.Types.Array, ref: "autores", required: true},
        editora: {type: String, required: true},
        numPag: {type: Number},
    }
);

const livros = mongoose.model("Livros", livroSchema);

export default livros;