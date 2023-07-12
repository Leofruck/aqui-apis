
let listaClientes = [];
let idAutoIncrement = 1;

function listar() {
    return listaClientes;
}

function inserir(cliente) {
    if(cliente && cliente.matricula && cliente.nome && cliente.telefone){
        cliente.id = idAutoIncrement++;
        cliente.livrosRetirados = 0
        listaClientes.push(cliente);
        return cliente;
    } else {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros dos clientes estao invalidos"
        });
    }
}

function buscarPorId(id) {
    for(let cliente of listaClientes){ 
        if(cliente.id == id){
            return cliente;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Cliente nao encontrado."
    });
}

function atualizar(id, clienteAlterar) {
    if(!clienteAlterar || !clienteAlterar.matricula || !clienteAlterar.nome || !clienteAlterar.telefone){
        throw ({
            numero: 400,
            msg: "Erro: Os parametros dos clientes estao invalidos"
        });       
    }
    for(let indice in listaClientes){
        if(listaClientes[indice].id == id) {
            clienteAlterar.id = parseInt(id);
            listaClientes[indice] = clienteAlterar;
            return listaClientes[indice];
        }
    }    
    throw ({
        numero: 404,
        msg: "Erro: Cliente nao encontrado."
    });
}

function deletar(id) {
    for(let indice in listaClientes){
        if(listaClientes[indice].id == id) {
            const clienteDeletado = listaClientes.splice(indice,1);
            return clienteDeletado[0];
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Cliente nao encontrado."
    });

}

module.exports = { 
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}