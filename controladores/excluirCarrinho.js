const sacola = require('../dados/sacola.js');

const excluirCarrinho = (req, res) => {
    sacola[0].produtos = [];

    sacola[0].subTotal = 0;
    sacola[0].valorDoFrete = 0;
    sacola[0].totalAPagar = 0;

    res.status(200);
    res.send('Carrinho limpo!');
};

module.exports = excluirCarrinho;
