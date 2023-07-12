const cadastroCliente = require('../cadastro_cliente');
const repositoryCliente = require('../repository/cliente_repository')

async function listarCliente(req, res) {
  const listaClientes = await repositoryCliente.listar();
  res.json(listaClientes);
}

async function buscarPorId(req,res) {
  const id = req.params.id;
  const cliente = await repositoryCliente.buscarPorId(id);
  if(cliente){
      res.json(cliente);
  }
  else {
      res.status(404).json(
          {
              numero: 404,
              msg: "Erro: Cliente nao encontrado."
          }
      );
  }
}
async function inserirCliente(req, res) {
  const cliente = req.body;

  try {
    const clienteInserido = repositoryCliente.inserir(cliente);
    res.status(201).json(clienteInserido);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

async function atualizaCliente(req,res) {
  const id = req.params.id;
  const cliente = req.body;

  if(cliente && cliente.nome && cliente.matricula && cliente.telefone)
  {
      const clienteAlterado = 
          await repositoryCliente.atualizar(id,cliente);
      if(clienteAlterado){
          res.json(clienteAlterado);
      }
      else {
          res.status(404).json(
              {
                  numero: 404,
                  msg: "Erro: Cliente nao encontrado."
              }
          );
      }        
  }
}

async function deletarCliente(req, res) {
  const id = req.params.id;

  try {
    repositoryCliente.deletar(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function associarClienteAoLivro(req, res) {
  const idLivro = req.params.id;
  const cliente = req.body;

  try {
    const livroComClienteAssociado = cadastroCliente.associarClienteAoLivro(idLivro, cliente);
    res.status(201).json(livroComClienteAssociado);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function desassociarClienteDoLivro(req, res) {
  const idLivro = req.params.id;

  try {
    cadastroCliente.desassociarClienteDoLivro(idLivro);
    res.sendStatus(204);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

module.exports = {
  listarCliente,
  buscarPorId,
  inserirCliente,
  atualizaCliente,
  deletarCliente,
  associarClienteAoLivro,
  desassociarClienteDoLivro
};