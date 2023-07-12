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
    const res = await novoCliente.query('SELECT * FROM cliente')
    const listaProdutos = res.rows;
    await novoCliente.end();
    return listaProdutos;
}



async function buscarPorId(id) {
    const novoCliente = new Client(conexao);
    await novoCliente.connect();
    const res = await novoCliente.query('SELECT * FROM cliente WHERE id=$1', [id]);
    const produto = res.rows[0];
    await novoCliente.end();
    return produto;
}


async function inserir(cliente) {
    const sql = 'INSERT INTO cliente (nome, matricula, telefone) VALUES ($1, $2, $3) RETURNING *';
    const values = [cliente.nome, cliente.matricula, cliente.telefone];

    const novoCliente = new Client(conexao);
    await novoCliente.connect();
    const res = await novoCliente.query(sql, values);
    const clienteInserido = res.rows[0];
    await novoCliente.end();
    return clienteInserido;
}

async function atualizar(id, cliente) {
    const sql = 'UPDATE cliente set nome=$1, matricula=$2, telefone=$3 WHERE id=$4 RETURNING *'
    const values = [cliente.nome, cliente.matricula, cliente.telefone, id];

    const novoCliente = new Client(conexao);
    await novoCliente.connect();
    const res = await novoCliente.query(sql,values);
    const clienteAtualizado = res.rows[0];
    await novoCliente.end();
    return clienteAtualizado;    
}

async function deletar(id) {
    const sql = 'DELETE FROM cliente WHERE id=$1 RETURNING *';
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