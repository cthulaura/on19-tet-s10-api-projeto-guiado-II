const express = require('express');
const app = express();
const port = 3000;
const listaClientes = require('./model/consultas-clientes.json')


app.use(express.json());

const recebeUltimoID = () => {
    const listaOrganizada = listaClientes.sort((clienteA, clienteB) => {
        if (clienteA.id < clienteB.id) {
            return -1;}
        if (clienteA.id > clienteB.id) {
            return 1;}
        
        return 0;
    });
    const valorUltimoID = listaOrganizada[listaOrganizada.length - 1]

    return valorUltimoID + 1;
};

const recebeUltimoIDConsulta = (cliente) => {
  const arrayConsultaOrdenado = cliente.procedimentos.sort ((consultaA, consultaB) => {
    if (consultaA.id < consultaB.clienteID) {
      return -1;
    }
    if (consultaA.id > consultaB.id) {
      return 1;
    }
    return 0;
  })
  const maiorConsultaID  = arrayConsultaOrdenado[arrayConsultaOrdenado.length - 1];

  return maiorConsultaID + 1

}

app.patch('./clientes/:id/consulta', (req, res) => {
  const {nome, data} = req.body;
  const clienteID = req.params.id;

  const existeCliente = listaClientes.find(
    (cliente) => cliente.id == clienteID
    );
    
    if (existeCliente) {
      const ultimoIDCOnsultas = recebeUltimoIDConsulta(existeCliente);
      const novaConsulta = {
        id: ultimoIDCOnsultas,
        nome: nome,
        data: data,
      };
      listaClientes.map((cliente, index) => {
        if (cliente.id == clienteID) {
          listaClientes[index] = {
            ...listaClientes[index],
            procedimentos: []
          }
        }
      })
    }
})

app.post("/clientes/add", (req,res) => {
    const {nome_cliente, pet} = req.body;

    const IDnovo = recebeUltimoID();

    const novoClienteComID = {
      id: IDnovo,
      nome_cliente: nome_cliente,
      pet: pet,
      procedimentos: []
    };
    listaClientes.push(novoClienteComID);
    return res.json(novoClienteComID);

})




app.listen(port, () => {
    console.log(`API está ouvindo a porta ${port}.`);
})