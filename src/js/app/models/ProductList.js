export class ProductList {
  constructor() {
    this._products = [];
  }

  add(produto) {
    this._products.push(produto);
  }

  get products() {
    return [].concat(this._products[0]);
  }

  cleanList(){
    this._products = [];
  }
 
  
}
