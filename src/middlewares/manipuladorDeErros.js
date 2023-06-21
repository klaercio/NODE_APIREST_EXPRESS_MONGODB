import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";


// eslint-disable-next-line
const manipuladorDeErros = (err, req, res, next) => {
    
    if (err instanceof mongoose.Error.CastError)
        new RequisicaoIncorreta().enviarResposta(res);
    else if(err instanceof mongoose.Error.ValidationError)
        new ErroValidacao(err).enviarResposta(res);
    else
        new ErroBase().enviarResposta(res);
};

export default manipuladorDeErros;