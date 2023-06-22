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
            required: [true, "Campo editora é obrigatório"],
            enum: {
                values: ["Casa do código", "alura"],
                message: "A editora {VALUE} fornecida não é um valor permitido"
            }
        },
        numPag: {
            type: Number,
            min: [10, "Quantidade de páginas é menor que o mínimo permitido(10)"],
            max: [5000, "Quantidade de páginas é maior que o máximo permitido(5000)"],
        },
    }
);

const livros = mongoose.model("Livros", livroSchema);

export default livros;