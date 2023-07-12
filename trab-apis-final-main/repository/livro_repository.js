const { Client } = require('pg')
const conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'cliente_biblioteca',
};


async function listar() {
    const novoCliente = new Client(conexao);
    await novoCliente.connect();
    const res = await novoCliente.query('SELECT * FROM livro')
    const listaProdutos = res.rows;
    await novoCliente.end();
    return listaProdutos;
}



async function buscarPorId(id) {
    const novoCliente = new Client(conexao);
    await novoCliente.connect();
    const res = await novoCliente.query('SELECT * FROM livro WHERE id=$1', [id]);
    const produto = res.rows[0];
    await novoCliente.end();
    return produto;
}


async function inserir(livro) {
    const sql = 'INSERT INTO livro (isbn, nome, autor, editora, ano) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [livro.isbn, livro.nome, livro.autor, livro.editora, livro.ano];

    const novoCliente = new Client(conexao);
    await novoCliente.connect();
    const res = await novoCliente.query(sql, values);
    const livroInserido = res.rows[0];
    await novoCliente.end();
    return livroInserido;
}

async function atualizar(id, livro) {
    const sql = 'UPDATE livro set isbn=$1, nome=$2, autor=$3, editora=$4, ano=$5 WHERE id=$6 RETURNING *'
    const values = [livro.isbn, livro.nome, livro.autor, livro.editora, livro.ano, id];

    const novoCliente = new Client(conexao);
    await novoCliente.connect();
    const res = await novoCliente.query(sql,values);
    const livroAtualizado = res.rows[0];
    await novoCliente.end();
    return livroAtualizado;    
}

async function deletar(id) {
    const sql = 'DELETE FROM livro WHERE id=$1 RETURNING *';
    const values = [id];

    const novoCliente = new Client(conexao);
    await novoCliente.connect();
    const res = await novoCliente.query(sql, values);
    const produtoDeletado = res.rows[0];
    await novoCliente.end();
    return produtoDeletado;
}




module.exports = { 
    listar,
    buscarPorId, 
    inserir,
    atualizar,
    deletar
}