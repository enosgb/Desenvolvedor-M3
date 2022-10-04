export class ShoppingList {
  constructor() {
    this._shoppingList = [];
    this._amountList = [];
  }

  add(purchase) {
    if (!this._shoppingList.includes(purchase)) {
      this._shoppingList.push(purchase);
      return false;
    } else {
      return true;
    }
  }

  remove(id) {
    for (let i = 0; i < this._shoppingList.length; i++) {
      if (this._shoppingList[i].id == id) {
        this._shoppingList.splice(i, 1);
      }
    }
  }

  get purchases() {
    return [].concat(this._shoppingList);
  }

  addAmount(amount) {
    this._amountList.push(amount);
  }

  setAmount(id, amount) {
    this._amountList[id][0].count = amount;
  }
  removeAmount(id) {
    for (let i = 0; i < this._amountList.length; i++) {
      if (this._amountList[i][0].id == id) {
        this._amountList.splice(i, 1);
      }
    }
  }

  getPosition(id) {
    for (let i = 0; i < this._amountList.length; i++) {
      if (this._amountList[i][0].id == id) {
        return i;
      }
    }
  }

  get amount() {
    return [].concat(this._amountList);
  }
}
