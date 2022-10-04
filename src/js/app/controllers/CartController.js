export class CartController {
  constructor(cartView, shoppingList) {
    let $ = document.querySelector.bind(document);
    this._cart = $(".header__cart");
    this._cart.hidden = true;
    this._btnBag = $(".header__btn_bag");
    this._amount_buttons = $(".header__cart");
    this._btn_purchase = $(".content__container__grid_container");
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
      if (id >= 0) {
        shoppingList.remove(id);
        shoppingList.removeAmount(id);
        cartView.update(shoppingList.purchases);
        cartView.countItemsCart(shoppingList.purchases.length, btnBag);
        if (shoppingList.purchases.length <= 0) cart.hidden = true;
      }
    });
  }

  amountItems() {
    let amount_buttons = this._amount_buttons;
    let shoppingList = this._shoppingList;
    let cartController = new CartController();
    let position = 0;
    amount_buttons.addEventListener("click", function (event) {
      event.preventDefault();
      let id = event.target.name - 1;
      let amount = document.querySelector(`#set_amount${id + 1}`);

      if (
        event.target.id == "btn_amount_minus" &&
        shoppingList.amount[0][0].count > 1
      ) {
        position = shoppingList.getPosition(event.target.name);
        let temp = shoppingList.amount[position][0].count;
        if (temp > 1) temp -= 1;
        shoppingList.setAmount(position, temp);
        amount.textContent = shoppingList.amount[position][0].count;
      } else if (event.target.id == "btn_amount_plus") {
        position = shoppingList.getPosition(event.target.name);
        let temp = shoppingList.amount[position][0].count + 1;
        shoppingList.setAmount(position, temp);
        amount.textContent = shoppingList.amount[position][0].count;
      }
    });
  }

  updateAmount(shoppingList, amountList, id) {
    if (amountList.length > 0) {
      for (let i = id; i < shoppingList.purchases.length; i++) {
        if (shoppingList.purchases[i].id == amountList[i][0].id) {
          let element = document.querySelector(`#set_amount${id}`);
          if (element.textContent != null) {
            element.textContent = amountList[i][0].count;
          }
        }
      }
    }
  }

  loadCart() {
    this._cartSpan();
    this._removeItemCart();
    this.amountItems();
  }
}
