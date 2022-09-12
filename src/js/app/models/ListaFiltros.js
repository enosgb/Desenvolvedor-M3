export class ListaFiltros {
  constructor() {
    this._listaFiltros = [];
  }

  adicionar(cor) {
    this._listaFiltros.push(cor);
  }

  limpar(){
    this._listaFiltros = [];
  }
  get produtos() {
    return [].concat(this._listaFiltros);
  }
}
