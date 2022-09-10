export class ListaCompras{
    constructor(){
        this._listaCompras = []
    }

    adiciona(compra){
        this._listaCompras.push(compra);
    }

    remove(id){
        for(let i = 0; i < this._listaCompras.length; i++){
            if(this._listaCompras[i].id == id){
                this._listaCompras.splice(i,1)
            }
        }
    }

    get compras(){
        return [].concat(this._listaCompras)
    }
}