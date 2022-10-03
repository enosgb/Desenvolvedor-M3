import { ProductsView } from "../views/ProductsView.js";
import { ProductList } from "../models/ProductList.js";
import { CartView } from "../views/CartView.js";
import { ShoppingList } from "../models/ShoppingList.js";
import { SidebarController } from "./SidebarController.js";
import { CartController } from "./CartController.js";

export class ProductController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._cart = $(".header__cart");
    this._btnLoadMore = $(".content__container__btn_load_more");
    this._btnPurchase = $(".content__container__grid_container");
    this._btnBag = $(".header__btn_bag");
    this._productsList = new ProductList();
    this._productsView = new ProductsView($("#products"));
    this._cartView = new CartView(this._cart);
    this._shoppingList = new ShoppingList();
    this._cartController = new CartController(
      this._cartView,
      this._shoppingList
    );
    this._lenProducts = this._validateScreen();
  }

  _validateScreen() {
    if (screen.width > 600 && screen.width <= 768) return 6;
    else if (screen.width > 768 && screen.width < 1300) return 9;
    else if (screen.width <= 600) return 4;
    else return 9;
  }

  _getProducts(lenProducts) {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((products) => {
        this._productsList.add(products);
        this._sidebarController = new SidebarController(products,lenProducts);
        this._sidebarController.loadSidebar();
        this._productsView.update(this._productsList.products.slice(0, lenProducts));
        this._getMoreProducts(this._productsList.products,lenProducts);
      });
  }

  _getMoreProducts(products,lenProducts) {
    let length = lenProducts;
    let productList = this._productsList;
    let productsView = this._productsView;
    this._btnLoadMore.addEventListener("click", function () {
      length += lenProducts;
      productsView.update(productList.products.slice(0, length));
      if (products.length <= length) {
        this.hidden = true;
      }
    });
  }

  _purchase() {
    let productsList = this._productsList;
    let cartView = this._cartView;
    let ShoppingList = this._shoppingList;
    let btnBag = this._btnBag;
    this._btnPurchase.addEventListener("click", function (event) {
      let id = event.target.id;
      if (id >= 0) {
        productsList.products.forEach((p) => {
          if (p.id == id) {
            ShoppingList.add(p);
            cartView.update(ShoppingList.purchases);
            cartView.countItemsCart(ShoppingList.purchases.length, btnBag);
            id = -1;
          }
        });
      }
    });
  }

  carregarProdutos() {
    this._getProducts(this._lenProducts);
    this._purchase();
    this._cartController.loadCart();
  }
}
