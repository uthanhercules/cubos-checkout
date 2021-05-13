const hoje = new Date();
const entrega = new Date();

entrega.setDate(hoje.getDate() + 15);

const sacola = [
    {
        subTotal: 0,
        dataDeEntrega: entrega,
        valorDoFrete: 0,
        totalAPagar: 0,
        produtos: [],
    },
];

module.exports = sacola;
