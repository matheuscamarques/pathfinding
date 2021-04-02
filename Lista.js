class No{
     prox = null;
     anterior = null;
     elem = null; 
}


function createNode(){
    return null;
}

function addNode(node,elem){
    let n = new No;
    n.prox = node;
    n.elem = elem;
    return n;
}
 //3 - 2  -  1- NULL
function nodeTail(node){
    aux = node;
    while(aux.prox != null){
        aux = aux.prox;
    }

    return aux.elem;
}

function nodeHead(node){
    return node.elem;
}

function printAll(node){
    aux = node;
    let s = '';
    while (aux != null){
        s = s +`  ${aux.elem}  `;
        aux = aux.prox;
    }
    console.log(s);
}

function emptyNode(node){
    return node == null;
}

function removeNode(node,  elem){
    prev = new No;
    prev = null;
    atual = node;
    while (atual != null && atual.elem != elem){
          prev = atual;
          atual = atual.prox;
    }
    // Eh o primeiro elemento 
    if (prev == null) {
        n = atual.prox;
        atual = null;
        return n;
    }
    // Nao acho o elemento
    if (atual == null && prev.elem != elem) return node;
    // Eh o ultimo elemento
    if (atual == null && prev.elem == elem) prev.prox = null;
    else { // Eh um qualquer da lista
        prev.prox = atual.prox;
        atual = null;
    }
    return node;
}

function search(node, elem){
    aux = node;
    while (aux != null){
        if (aux.elem == elem.elem){
            aux = aux.prox;
            console.log("achou",aux);
        }
        
    }
    if (aux != null)
        return aux.elem;
    return null;
}

