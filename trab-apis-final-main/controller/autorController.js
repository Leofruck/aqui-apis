const cadastroAutores = require('../cadastro_autores');

function listarAutores(req, res) {
  const listaAutores = cadastroAutores.listar();
  res.json(listaAutores);
}

function buscarAutorPorId(req, res) {
  const id = req.params.id;

  try {
    const autor = cadastroAutores.buscarPorId(id);
    res.json(autor);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function inserirAutor(req, res) {
  const autor = req.body;

  try {
    const autorInserido = cadastroAutores.inserir(autor);
    res.status(201).json(autorInserido);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function atualizarAutor(req, res) {
  const id = req.params.id;
  const autorAtualizado = req.body;

  try {
    const autor = cadastroAutores.atualizar(id, autorAtualizado);
    res.json(autor);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function deletarAutor(req, res) {
  const id = req.params.id;

  try {
    cadastroAutores.deletar(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}


function associarAutorAoLivro(req, res) {
  const idLivro = req.params.id;
  const autor = req.body;

  try {
    const livroComAutorAssociado = cadastroAutores.associarAutorAoLivro(idLivro, autor);
    res.status(201).json(livroComAutorAssociado);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function desassociarAutorDoLivro(req, res) {
  const idLivro = req.params.id;

  try {
    cadastroAutores.desassociarAutorDoLivro(idLivro);
    res.sendStatus(204);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

module.exports = {
  listarAutores,
  buscarAutorPorId,
  inserirAutor,
  atualizarAutor,
  deletarAutor,
  associarAutorAoLivro,
  desassociarAutorDoLivro
};