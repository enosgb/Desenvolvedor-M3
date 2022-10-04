import { FilterList } from "../models/FilterList.js";
import { MobileController } from "./MobileController.js";

export class FilterController {
  constructor(productsList, productsView,lenProducts) {
    let $ = document.querySelector.bind(document);
    this._productsList = productsList;
    this._checkboxColors = $("#checkbox_colors");
    this._sizeButtons = $(".content__sidebar__sizes");
    this._checkboxPrices = $(".content__sidebar__prices");
    this._filterlist = new FilterList();
    this._mobileController = new MobileController(productsList,productsView,lenProducts,this._filterlist);
    this._productsView = productsView;
    this._btnLoadMore = $(".content__container__btn_load_more");
    this._sl_orderby = $(".content__container__btn_select_oderby");
    this._sl_orderby_content = $(".content__container__select_oderby_content");
    this._lenProducts = lenProducts;
  }

  filters() {
    let filterList = this._filterlist;
    let productsList = this._productsList;
    let checkboxColors = this._checkboxColors;
    let sizeButtons = this._sizeButtons;
    let checkboxPrices = this._checkboxPrices;
    let productsView = this._productsView;
    let btnLoadMore = this._btnLoadMore;
    let sl_orderby = this._sl_orderby;
    let sl_orderby_content = this._sl_orderby_content;
    let select_content = this._sl_orderby_content;
    let mobileController = this._mobileController;
    let lenProducts = this._lenProducts;

    function orderFilter() {
      function actionSelect(content) {
        if (content.style.display == "block") {
          content.style.display = "none";
          if(screen.width < 1300) mobileController.hideAndUnhideScreen("show");
        } else {
          content.style.display = "block";
        }
      }
      sl_orderby.addEventListener("click", function (event) {
        event.preventDefault();
        actionSelect(select_content);
      });
      sl_orderby_content.addEventListener("click", function (event) {
        event.preventDefault();
        actionSelect(select_content);
        let order = event.target.name;
        filterList.clearOrder();
        filterList.addOrder(order);
        runFilters(
          filterList.colors,
          filterList.sizes,
          filterList.prices,
          filterList.order
        );
        if (
          filterList.colors.length <= 0 &&
          filterList.sizes.length <= 0 &&
          filterList.prices.length <= 0
        ) {
          productsView.update(productsList.slice(0, lenProducts));
          btnLoadMore.hidden = false;
        } else {
          btnLoadMore.hidden = true;
        }
        filterList.clearProducts();
      });
    }

    function colorFilter() {
      checkboxColors.addEventListener("change", function (event) {
        let color = event.target.name;
        let checked = event.target.checked;
        if (checked == true) {
          filterList.addColor(color);
        } else {
          filterList.removeColor(color);
        }
        runFilters(
          filterList.colors,
          filterList.sizes,
          filterList.prices,
          filterList.order
        );
        if (
          filterList.colors.length <= 0 &&
          filterList.sizes.length <= 0 &&
          filterList.prices.length <= 0
        ) {
          productsView.update(productsList.slice(0, lenProducts));
          btnLoadMore.hidden = false;
        } else {
          btnLoadMore.hidden = true;
        }
        filterList.clearProducts();
      });
    }

    function sizeFilter() {
      sizeButtons.addEventListener("change", function (event) {
        let size = event.target.name;
        let checked = event.target.checked;
        if (checked == true) {
          filterList.addSize(size);
        } else {
          filterList.removeSize(size);
        }
        runFilters(
          filterList.colors,
          filterList.sizes,
          filterList.prices,
          filterList.order
        );
        if (
          filterList.colors.length <= 0 &&
          filterList.sizes.length <= 0 &&
          filterList.prices.length <= 0
        ) {
          productsView.update(productsList.slice(0, lenProducts));
          btnLoadMore.hidden = false;
        } else {
          btnLoadMore.hidden = true;
        }
        filterList.clearProducts;
      });
    }

    function priceFilter() {
      checkboxPrices.addEventListener("change", function (event) {
        let price = event.target.id;
        let checked = event.target.checked;
        if (checked == true) {
          filterList.addPrice(price);
        } else {
          filterList.removePrice(price);
        }
        runFilters(
          filterList.colors,
          filterList.sizes,
          filterList.prices,
          filterList.order
        );
        if (
          filterList.colors.length <= 0 &&
          filterList.sizes.length <= 0 &&
          filterList.prices.length <= 0
        ) {
          productsView.update(productsList.slice(0, lenProducts));
          btnLoadMore.hidden = false;
        } else {
          btnLoadMore.hidden = true;
        }
        filterList.clearProducts();
      });
    }

    function runFilters(colorList, sizeList, priceList, order) {
      let products = productsList
        .sort((a, b) => {
          if (order.length >= 1) {
            if (order == "lowest-price") {
              return a.price - b.price;
            } else if (order == "biggest-price") {
              return b.price - a.price;
            } else if (order == "recent") {
              return parseInt(b.date.split("-")) - parseInt(a.date.split("-"));
            } else {
              return false;
            }
          }
        })
        .filter((p) => {
          if (colorList.length >= 1) {
            for (let i = 0; i < colorList.length; i++) {
              if (p.color.includes(colorList[i])) {
                filterList.addProducts(p);
                return true;
              }
            }
            return false;
          }
          return true;
        })
        .filter((p) => {
          if (sizeList.length >= 1) {
            for (let i = 0; i < sizeList.length; i++) {
              if (p.size.includes(sizeList[i])) {
                filterList.addProducts(p);
                return true;
              }
            }
            return false;
          }
          return true;
        })
        .filter((p) => {
          if (priceList.length >= 1) {
            for (let i = 0; i < priceList.length; i++) {
              let from = priceList[i].split("-")[0];
              let to = priceList[i].split("-")[1];
              if (p.price >= from && p.price <= to) {
                filterList.addProducts(p);
                return true;
              }
            }
            return false;
          }
          return true;
        });

      productsView.update(products);
    }

    colorFilter();
    sizeFilter();
    priceFilter();
    orderFilter();
    this._mobileController.mobile();
  }

  loadFilters() {
    this.filters();
  }
}
