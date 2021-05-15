const dados = require('../dados/data.json');

const listarTodos = (req, res) => {
    const categoria = req.query.categoria;
    const precoInicial = req.query.precoInicial;
    const precoFinal = req.query.precoFinal;

    if (categoria && precoInicial && precoFinal) {
        res.status(200);
        res.send(
            dados.produtos.filter(
                (item) =>
                    item.preco >= precoInicial &&
                    item.preco <= precoFinal &&
                    item.categoria === categoria
            )
        );
    } else if (precoInicial && precoFinal) {
        res.status(200);
        res.send(
            dados.produtos.filter(
                (item) => item.preco >= precoInicial && item.preco <= precoFinal
            )
        );
    } else if (categoria) {
        res.status(200);
        res.send(
            dados.produtos.filter(
                (item) => item.categoria === categoria && item.estoque > 0
            )
        );
    } else {
        res.status(200);
        res.send(dados.produtos.filter((item) => item.estoque > 0));
    }
};

module.exports = listarTodos;
