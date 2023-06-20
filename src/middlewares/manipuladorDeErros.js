import mongoose from "mongoose";


// eslint-disable-next-line
const manipuladorDeErros = (err, req, res, next) => {

    console.error(err);
    
    if (err instanceof mongoose.Error.CastError)
        res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"});
    else if(err instanceof mongoose.Error.ValidationError) {
        const messagesError = Object.values(err.errors).map(err => err.message).join("; ");
        res.status(400).send({message: `os seguintes erros foram encontrados:  ${messagesError}`});
    }
    else 
        res.status(500).send({message: `${err.message} - Erro interno do servidor`});
};

export default manipuladorDeErros;