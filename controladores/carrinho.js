const sacola = require('../dados/sacola.js');
const dados = require('../dados/data.json');
const erros = require('../dados/erros.js');

const temp = [];

const adicionarCarrinho = (req, res) => {
    const produto = Number(req.body.id);
    const quantidade = Number(req.body.quantidade);

    const itemPesquisado = dados.produtos.filter((item) => item.id === produto);
    const item = itemPesquisado[0];

    let taNoCarrinho = false;

    for (let mercadoria of sacola[0].produtos) {
        if (mercadoria.id === produto) {
            taNoCarrinho = true;

            mercadoria.quantidade += quantidade;
        }
    }

    if (item.estoque > 0 && !taNoCarrinho) {
        temp.push({
            id: item.id,
            quantidade: quantidade,
            nome: item.nome,
            preco: item.preco,
            categoria: item.categoria,
        });
    } else if (item.estoque === 0) {
        console.log('O item não está disponível no estoque');
        res.status(400);
        res.send(erros.semEstoque);
    }

    sacola[0].produtos = temp;

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

    res.status(200);
    res.send(sacola);
};

module.exports = adicionarCarrinho;
