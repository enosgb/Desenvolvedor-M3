export class ListaTamanhos{
    constructor(){
        this._listaTamanhos = []
    }

    adicionar(tamanho){
        this._listaTamanhos.push(tamanho)
    }

    get tamanhos(){
        return [].concat(this._listaTamanhos)
    }
}