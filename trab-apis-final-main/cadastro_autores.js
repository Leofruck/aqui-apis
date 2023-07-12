
let listaAutores = [];
let idAutoIncrement = 1;

function listar() {
    return listaAutores;
}

function inserir(autor) {
    if(autor && autor.nome && autor.paisOrigem){
        autor.id = idAutoIncrement++;
        listaAutores.push(autor);
        return autor;
    }
    else {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros de autor estao invalidos"
        });
    }
}

function buscarPorId(id) {
    for(let autor of listaAutores){ 
        if(autor.id == id){
            return autor;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Autor nao encontrado."
    });
}

function atualizar(id, autoresAlterar) {
    if(!autoresAlterar || !autoresAlterar.nome || !autoresAlterar.paisOrigem){
        throw ({
            numero: 400,
            msg: "Erro: Os parametros do Autor estao invalidos"
        });       
    }
    for(let indice in listaAutores){
        if(listaAutores[indice].id == id) {
            autoresAlterar.id = parseInt(id);
            listaAutores[indice] = autoresAlterar;
            return listaAutores[indice];
        }
    }    
    throw ({
        numero: 404,
        msg: "Erro: Autor não encontrado."
    });
}

function deletar(id) {
    for(let indice in listaAutores){
        if(listaAutores[indice].id == id) {
            const autoresDeletado = listaAutores.splice(indice,1);
            return autoresDeletado[0];
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Autor nao encontrado."
    });

}



module.exports = { 
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}