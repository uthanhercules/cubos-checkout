const dados = require('../dados/data.json');
const sacola = require('../dados/sacola');

const listarCarrinho = (req, res) => {
    res.send(sacola);
};

const listarTodos = (req, res) => {
    const categoria = req.query.categoria;
    const precoInicial = req.query.precoInicial;
    const precoFinal = req.query.precoFinal;

    if (categoria && precoInicial && precoFinal) {
        res.send(
            dados.produtos.filter(
                (item) =>
                    item.preco >= precoInicial &&
                    item.preco <= precoFinal &&
                    item.categoria === categoria
            )
        );
    } else if (precoInicial && precoFinal) {
        res.send(
            dados.produtos.filter(
                (item) => item.preco >= precoInicial && item.preco <= precoFinal
            )
        );
    } else if (categoria) {
        res.send(
            dados.produtos.filter(
                (item) => item.categoria === categoria && item.estoque > 0
            )
        );
    } else {
        res.send(dados.produtos.filter((item) => item.estoque > 0));
    }
};

module.exports = (listarTodos, listarCarrinho);
