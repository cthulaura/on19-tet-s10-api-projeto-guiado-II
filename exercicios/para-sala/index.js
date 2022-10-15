const express = require('express');
const app = express();
const port = 3000;
const listaClientes = require('./model/consultas-clientes.json')

app.use(express.json());

const recebeUltimoID = () => {
    const listaOrganizada = listaClientes.sort((clienteA, clienteB) => {
        if (clienteA.id < clienteB.id) {
            return 1;}
        if (clienteA.id > clienteB.id) {
            return -1;}
        
        return 0;
    });
    const valorUltimoID = listaOrganizada[listaOrganizada.length - 1]
    return valorUltimoID + 1;
};



app.post("/clientes/add", (req,res) => {
    const {nome_cliente, pet} = req.body;

    const IDnovo = 
})




app.listen(port, () => {
    console.log(`API está ouvindo a porta ${port}.`);
})