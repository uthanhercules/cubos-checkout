const sacola = require('../dados/sacola.js');
const erros = require('../dados/erros.js');

const modificarItem = (req, res) => {
    const produtoParaEditar = Number(req.params.id);
    const quantidadeParaAlterar = req.body.quantidade;

    let existe = false;

    for (let mercadoria of sacola[0].produtos) {
        if (mercadoria.id === produtoParaEditar) {
            existe = true;

            mercadoria.quantidade += quantidadeParaAlterar;

            if (mercadoria.quantidade <= 0) {
                const index = sacola[0].produtos.indexOf(mercadoria);

                sacola[0].produtos.splice(index, 1);
            }
        }
    }

    sacola[0].subTotal = 0;
    sacola[0].valorDoFrete = 0;
    sacola[0].totalAPagar = 0;

    for (let mercadorias of sacola[0].produtos) {
        sacola[0].subTotal += mercadorias.quantidade * mercadorias.preco;
    }

    if (sacola[0].subTotal < 20000) {
        sacola[0].valorDoFrete = 5000;
    }

    sacola[0].totalAPagar = sacola[0].valorDoFrete + sacola[0].subTotal;

    if (existe) {
        res.send(sacola);
    } else {
        res.send(erros.naoTaNoCarrinho);
    }
};

module.exports = modificarItem;
