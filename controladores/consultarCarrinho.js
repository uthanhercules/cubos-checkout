const sacola = require('../dados/sacola');

const listarCarrinho = (req, res) => {
    res.send(sacola);
};

module.exports = listarCarrinho;
