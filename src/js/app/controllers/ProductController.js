import { ProductsView } from "../views/ProductsView";
import { ProductList } from "../models/ProductList";
import { ChartView } from "../views/ChartView";
import { ShoppingList } from "../models/ShoppingList";
import { SidebarController } from "./SidebarController";

export class ProductController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._chart = $(".header__cart");
    this._chart.hidden = true;
    this._btnLoadMore = $(".content__container button");
    this._btnPurchase = $(".content__container__grid_container");
    this._btnBag = $(".header__btn_bag");
    this._productsList = new ProductList();
    this._productsView = new ProductsView($("#products"));
    this._chartView = new ChartView(this._chart);
    this._shoppingList = new ShoppingList();
  }

  _getProducts() {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((products) => {
        this._productsList.add(products);
        this._sidebarController = new SidebarController(products);
        this._sidebarController.loadSidebar();
        this._productsView.update(this._productsList.products.slice(0, 9));
        this._getMoreProducts(this._productsList.products);
      });
  }

  _getMoreProducts(products) {
    let length = 9;
    let productList = this._productsList;
    let productsView = this._productsView;
    this._btnLoadMore.addEventListener("click", function () {
      length += 9;
      productsView.update(productList.products.slice(0, length));
      if (products.length <= length) {
        this.hidden = true;
      }
    });
  }

  _chartSpan() {
    let chart = this._chart;
    let chartView = this._chartView;
    let shoppingList = this._shoppingList;
    let btnBag = document.querySelector(".header__items button");
    btnBag.addEventListener("click", function () {
      let countPurchases = shoppingList.purchases.length;
      if (chart.hidden) {
        chart.hidden = false;
        if (countPurchases <= 0) chartView.chartEmpty(chart);
      } else {
        chart.hidden = true;
      }
    });
  }
  _purchase() {
    let productsList = this._productsList;
    let chartView = this._chartView;
    let ShoppingList = this._shoppingList;
    let btnBag = this._btnBag;
    this._btnPurchase.addEventListener("click", function (event) {
      let id = event.target.id - 1;
      if (id >= 0) {
        ShoppingList.add(productsList.products[id]);
        chartView.update(ShoppingList.purchases);
        chartView.countItemsChart(ShoppingList.purchases.length, btnBag);
      }
    });
  }

  _removeItemChart() {
    let shoppingList = this._shoppingList;
    let chartView = this._chartView;
    let chart = this._chart;
    let btnBag = this._btnBag;
    this._chart.addEventListener("click", function (event) {
      event.preventDefault();
      let id = event.target.id;
      if ((id) => 0) {
        shoppingList.remove(id);
        chartView.update(shoppingList.purchases);
        chartView.countItemsChart(shoppingList.purchases.length, btnBag);
        if (shoppingList.purchases.length <= 0) chart.hidden = true;
      }
    });
  }

  carregarProdutos() {
    this._getProducts();
    this._purchase();
    this._chartSpan();
    this._removeItemChart();
  }
}
