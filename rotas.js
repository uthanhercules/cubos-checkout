const express = require('express');
const listarTodos = require('./controladores/consultas.js');
const listarCarrinho = require('./controladores/consultarCarrinho');
const adicionarCarrinho = require('./controladores/carrinho.js');
const modificarItem = require('./controladores/modificar.js');
const excluirItem = require('./controladores/deletar.js');
const excluirCarrinho = require('./controladores/excluirCarrinho.js');
const finalizarCompra = require('./controladores/finalizar.js');

const rotas = express();

rotas.get('/produtos', listarTodos);

rotas.get('/carrinho', listarCarrinho);
rotas.post('/carrinho/produtos', adicionarCarrinho);
rotas.patch('/carrinho/produtos/:id', modificarItem);
rotas.delete('/carrinho/produtos/:id', excluirItem);
rotas.delete('/carrinho', excluirCarrinho);

rotas.post('/finalizar-compra', finalizarCompra);

module.exports = rotas;
