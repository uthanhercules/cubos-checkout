const express = require('express');
const listarTodos = require('./controladores/consultas.js');

const rotas = express();

rotas.get('/produtos', listarTodos);

module.exports = rotas;
