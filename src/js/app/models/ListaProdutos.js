export class ListaProdutos {
  constructor() {
    this._produtos = [];
  }

  adiciona(produto) {
    this._produtos.push(produto);
  }

  get produtos() {
    return [].concat(this._produtos[0]);
  }

  limpar(){
    this._produtos = [];
  }
 
  
}
