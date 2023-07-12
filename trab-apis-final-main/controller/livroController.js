const cadastrolivro = require('../cadastro_livros');
const repositorylivros = require('../repository/livro_repository')

async function listarlivro(req, res) {
  const listalivros = await repositorylivros.listar();
  res.json(listalivros);
}

async function buscarPorId(req,res) {
  const id = req.params.id;
  const livro = await repositorylivros.buscarPorId(id);
  if(livro){
      res.json(livro);
  }
  else {
      res.status(404).json(
          {
              numero: 404,
              msg: "Erro: Livro nao encontrado."
          }
      );
  }
}

async function inserirlivro(req, res) {
  const livro = req.body;

  try {
    const livroInserido = repositorylivros.inserir(livro);
    res.status(201).json(livroInserido);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

async function atualizalivro(req,res) {
  const id = req.params.id;
  const livro = req.body;

  if(livro && livro.isbn && livro.nome && livro.autor && livro.editora && livro.ano)
  {
      const livroAlterado = 
          await repositorylivros.atualizar(id,livro);
      if(livroAlterado){
          res.json(livroAlterado);
      }
      else {
          res.status(404).json(
              {
                  numero: 404,
                  msg: "Erro: livro nao encontrado."
              }
          );
      }        
  }
}

async function deletarlivro(req, res) {
  const id = req.params.id;

  try {
    repositorylivros.deletar(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function associarlivroAoLivro(req, res) {
  const idLivro = req.params.id;
  const livro = req.body;

  try {
    const livroComlivroAssociado = cadastrolivro.associarlivroAoLivro(idLivro, livro);
    res.status(201).json(livroComlivroAssociado);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function desassociarlivroDoLivro(req, res) {
  const idLivro = req.params.id;

  try {
    cadastrolivro.desassociarlivroDoLivro(idLivro);
    res.sendStatus(204);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

module.exports = {
  listarlivro,
  buscarPorId,
  inserirlivro,
  atualizalivro,
  deletarlivro,
  associarlivroAoLivro,
  desassociarlivroDoLivro
};