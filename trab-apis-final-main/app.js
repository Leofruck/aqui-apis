const express = require('express');
const loginRouter = require('./rotas/login_rotas');
const livroRouter = require('./rotas/livro_rotas');
const autorRouter = require('./rotas/autor_rotas');
const clienteRouter = require('./rotas/cliente_rotas');

const app = express();
const PORTA = 3001;

app.use(express.json());

app.use('/login', loginRouter);
app.use('/livro', livroRouter);
app.use('/autores', autorRouter);
app.use('/cliente', clienteRouter);

app.listen(PORTA, () => {
  console.log("Servidor iniciado com sucesso...");
});