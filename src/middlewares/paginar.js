import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

const paginar = async (req, res, next) => {
    try {
        const {limite = 1, pagina = 1, ordenacao = "title:1"} = req.query;

        let [campoOrdenacao, ordem] = ordenacao.split(":");

        const resultado = req.resultado;

        const resultadoPaginado = await resultado
            .sort({[campoOrdenacao]: ordem})
            .skip((pagina-1) * limite)
            .limit(limite);

        if (limite < 1 || pagina < 1)  {
            next(new RequisicaoIncorreta());
        } else {
            res.status(200).json(resultadoPaginado);
        }
        
    }catch(err) {
        next(err);
    }
};

export default paginar;