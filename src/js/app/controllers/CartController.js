export class CartController {
  constructor(cartView, shoppingList) {
    let $ = document.querySelector.bind(document);
    this._cart = $(".header__cart");
    this._cart.hidden = true;
    this._btnBag = $(".header__btn_bag");
    this._cartView = cartView;
    this._shoppingList = shoppingList;
  }

  _cartSpan() {
    let cart = this._cart;
    let cartView = this._cartView;
    let shoppingList = this._shoppingList;
    let btnBag = document.querySelector(".header__items button");
    btnBag.addEventListener("click", function () {
      let countPurchases = shoppingList.purchases.length;
      if (cart.hidden) {
        cart.hidden = false;
        if (countPurchases <= 0) cartView.cartEmpty(cart);
      } else {
        cart.hidden = true;
      }
    });
  }
  _removeItemCart() {
    let shoppingList = this._shoppingList;
    let cartView = this._cartView;
    let cart = this._cart;
    let btnBag = this._btnBag;
    this._cart.addEventListener("click", function (event) {
      event.preventDefault();
      let id = event.target.id;
      if ((id) => 0) {
        shoppingList.remove(id);
        cartView.update(shoppingList.purchases);
        cartView.countItemsCart(shoppingList.purchases.length, btnBag);
        if (shoppingList.purchases.length <= 0) cart.hidden = true;
      }
    });
  }

  loadCart() {
    this._cartSpan();
    this._removeItemCart();
  }
}
