import { ProductsView } from "../views/ProductsView";
import { FilterController } from "./FilterController";

export class SidebarController {
  constructor(productList) {
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);
    this._linkSeeAllColors = $("#verTodasAsCores");
    this._checkboxHidden = $$("#checkboxHidden");
    this._checkboxColors = $("#checkboxCores");
    this._productsList = productList;
    this._btnLoadMore = $(".btn_carregarMais");
    this._btnSizes = $(".sizes");
    this._productsView = new ProductsView($("#produtos"));
    this._filtersController = new FilterController(productList,this._productsView);
  }

  _seeAllColors() {
    let checkboxHidden = this._checkboxHidden;
    this._linkSeeAllColors.addEventListener("click", function (event) {
      event.preventDefault();
      checkboxHidden.forEach((checkbox,i) => {
        checkbox.hidden = false;
      });
      this.hidden = true;
    });
  }

  loadSidebar() {
    this._seeAllColors();
    this._filtersController.loadFilters();
  }
}
