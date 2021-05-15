const sacola = require('../dados/sacola');

const listarCarrinho = (req, res) => {
    res.status(200);
    res.send(sacola);
};

module.exports = listarCarrinho;
