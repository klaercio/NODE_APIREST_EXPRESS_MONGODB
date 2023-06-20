import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
    {
        id: {type: String},
        title: {
            type: String, 
            required: [true, "Campo titulo é obrigatório"]
        },
        autor: {
            type: mongoose.Schema.Types.Array,
            ref: "autores",
            required: [true, "Campo autor é obrigatório"]
        },
        editora: {
            type: String,
            required: [true, "Campo editora é obrigatório"]
        },
        numPag: {type: Number},
    }
);

const livros = mongoose.model("Livros", livroSchema);

export default livros;