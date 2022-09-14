export class FilterList {
  constructor() {
    this._productsList = [];
    this._colorList = [];
    this._sizeList = [];
    this._priceList = [];
    this._orderList = [];
  }

  addProducts(product) {
    this._productsList.push(product);
  }

  addColor(color) {
    this._colorList.push(color);
  }

  addSize(size) {
    this._sizeList.push(size);
  }

  addPrice(price) {
    this._priceList.push(price);
  }

  addOrder(order){
    this._orderList.push(order);
  }

  removeColor(color) {
    for (let i = 0; i < this._colorList.length; i++) {
      if (this._colorList[i] === color) {
        this._colorList.splice(i, 1);
      }
    }
  }

  removeSize(size) {
    for (let i = 0; i < this._sizeList.length; i++) {
      if (this._sizeList[i] === size) {
        this._sizeList.splice(i, 1);
      }
    }
  }

  removePrice(price) {
    for (let i = 0; i < this._priceList.length; i++) {
      if (this._priceList[i] === price) {
        this._priceList.splice(i, 1);
      }
    }
  }

  removeProduct(product) {
    for (let i = 0; i < this._productsList.length; i++) {
      if (this._productsList[i] === product) {
        this._productsList.splice(i, 1);
      }
    }
  }


  clearProducts() {
    this._productsList = [];
  }

  clearOrder(){
    this._orderList = [];
  }

  get products() {
    return [].concat(this._productsList);
  }

  get colors() {
    return [].concat(this._colorList);
  }

  get sizes() {
    return [].concat(this._sizeList);
  }

  get prices() {
    return [].concat(this._priceList);
  }

  get order(){
    return [].concat(this._orderList);
  }
}
