const sacola = require('../dados/sacola.js');
const erros = require('../dados/erros.js');
const dados = require('../dados/data.json');

const finalizarCompra = (req, res) => {
    const dadosDoCliente = req.body;
    const itensNaSacola = sacola[0].produtos;

    let temItem = false;
    let temEstoque = true;

    for (let item of itensNaSacola) {
        if (item) {
            temItem = true;
        }
    }

    for (let item of dados.produtos) {
        for (let produto of itensNaSacola) {
            if (item.id === produto.id) {
                if (item.estoque < produto.quantidade) {
                    temEstoque = false;
                }
            }
        }
    }

    if (!temItem) {
        res.send(erros.carrinhoVazio);
    } else if (!temEstoque) {
        res.send(erros.semEstoque);
    } else {
        if (dadosDoCliente.type !== 'individual') {
            res.send('Apenas trabalhamos com clientes individuais.');
        } else if (dadosDoCliente.country !== 'br') {
            res.send(
                'Apenas trabalhamos com clientes em território brasileiro.'
            );
        } else if (dadosDoCliente.documents[0].type !== 'cpf') {
            res.send('Trabalhamos apenas com pessoa física.');
        } else {
            const nome = dadosDoCliente.name.trim().split(' ');
            const cpf = dadosDoCliente.documents[0].number;
            const temLetraCPF = isNaN(cpf);

            let nomeC = false;

            if (nome.length > 1) {
                nomeC = true;
            } else {
                res.send('Nome inválido.');
            }

            if (cpf.length === 11 && !temLetraCPF) {
                for (let item of dados.produtos) {
                    for (let produto of itensNaSacola) {
                        if (item.id === produto.id) {
                            item.estoque -= produto.quantidade;
                        }
                    }
                }

                const hoje = new Date();
                const entrega = new Date();

                entrega.setDate(hoje.getDate() + 15);

                sacola[0].dataDeEntrega = entrega;

                sacola.push('Obrigado pela sua compra!');
                res.send(sacola);

                sacola[0].produtos = [];

                sacola[0].subTotal = 0;
                sacola[0].valorDoFrete = 0;
                sacola[0].totalAPagar = 0;
                sacola[0].dataDeEntrega = '';

                sacola.splice(1, Number.MAX_VALUE);
            } else {
                res.send('CPF inválido.');
            }
        }
    }
};

module.exports = finalizarCompra;
