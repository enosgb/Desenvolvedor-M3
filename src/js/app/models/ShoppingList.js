export class ShoppingList {
  constructor() {
    this._shoppingList = [];
  }

  add(purchase) {
    if (!this._shoppingList.includes(purchase)) {
      this._shoppingList.push(purchase);
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
}
