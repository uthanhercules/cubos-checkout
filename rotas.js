const express = require('express');
const listarTodos = require('./controladores/consultas.js');
const listarCarrinho = require('./controladores/consultas.js');
const adicionarCarrinho = require('./controladores/carrinho.js');

const rotas = express();

rotas.get('/produtos', listarTodos);
rotas.get('/carrinho', listarCarrinho);
rotas.post('/carrinho/produtos', adicionarCarrinho);

module.exports = rotas;
