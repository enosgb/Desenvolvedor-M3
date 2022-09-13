import { FilterList } from "../models/FilterList";
import { ProductsView } from "../views/ProductsView";

export class FilterController {
  constructor(productsList, productsView) {
    let $ = document.querySelector.bind(document);
    this._productsList = productsList;
    this._checkboxColors = $("#checkboxCores");
    this._sizeButtons = $(".tamanhos");
    this._checkboxPrices = $(".checkboxPrecos");
    this._filterlist = new FilterList();
    this._productsView = productsView;
    this._btnLoadMore = $(".btn_carregarMais");
  }

  filters() {
    let filterList = this._filterlist;
    let productsList = this._productsList;
    let checkboxColors = this._checkboxColors;
    let sizeButtons = this._sizeButtons;
    let checkboxPrices = this._checkboxPrices;
    let productsView = this._productsView;
    let btnLoadMore = this._btnLoadMore;

    function colorFilter() {
      checkboxColors.addEventListener("change", function (event) {
        let color = event.target.name;
        let checked = event.target.checked;
        if (checked == true) {
          filterList.addColor(color);
        } else {
          filterList.removeColor(color);
        }
        filter(filterList.colors, filterList.sizes, filterList.prices);
        if (filterList.colors.length <= 0 && filterList.prices.length <= 0) {
          productsView.update(productsList);
        }
        filterList.clearProducts();

        btnLoadMore.hidden = true;
      });
    }

    function sizeFilter() {
      sizeButtons.addEventListener("click", function (event) {
        event.preventDefault();
        let size = event.target.textContent;
        filterList.addSize(size);
        filter(filterList.colors, filterList.sizes, filterList.prices);
        filterList.clearSizes();
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
        filter(filterList.colors, filterList.sizes, filterList.prices);
        if (filterList.colors.length <= 0 && filterList.prices.length <= 0) {
          productsView.update(productsList);
        }
        filterList.clearProducts();
        btnLoadMore.hidden = true;
      });
    }

    function filter(colorList, sizeList, priceList) {
      console.log(sizeList);
      let products = productsList
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
  }

  loadFilters() {
    this.filters();
  }
}
