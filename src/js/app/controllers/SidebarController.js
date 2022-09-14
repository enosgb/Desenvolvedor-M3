import { ProductsView } from "../views/ProductsView";
import { FilterController } from "./FilterController";

export class SidebarController {
  constructor(productList) {
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);
    this._linkSeeAllColors = $("#see_all_colors");
    this._checkboxHidden = $$("#checkboxHidden");
    this._checkboxColors = $("#checkbox_colors");
    this._productsList = productList;
    this._btnLoadMore = $(".content__container__btn_load_more");
    this._btnSizes = $(".sizes");
    this._productsView = new ProductsView($("#products"));
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
