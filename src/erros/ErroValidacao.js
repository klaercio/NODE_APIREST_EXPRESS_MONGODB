import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
    constructor(err) {
        const messagesError = Object.values(err.errors).map(err => err.message).join("; ");
        super(`os seguintes erros foram encontrados:  ${messagesError}`);
    }
}

export default ErroValidacao;