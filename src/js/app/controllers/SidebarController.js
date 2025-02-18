import { ProductsView } from "../views/ProductsView.js";
import { FilterController } from "./FilterController.js";
import { ProductController } from "./ProductController.js";
export class SidebarController {
  constructor(products,lenProducts) {
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);
    this._linkSeeAllColors = $("#see_all_colors");
    this._checkboxHidden = $$("#checkboxHidden");
    this._checkboxColors = $("#checkbox_colors");
    this._productsList = products;
    this._btnLoadMore = $(".content__container__btn_load_more");
    this._btnSizes = $(".sizes");
    this._productsView = new ProductsView($("#products"));
    this._filtersController = new FilterController(
      products,
      this._productsView,
      lenProducts
    );
    this._productController = new ProductController();
  }

  _seeAllColors() {
    let checkboxHidden = this._checkboxHidden;
    if(screen.width < 1300){
      checkboxHidden.forEach((checkbox,i)=>{
        checkbox.hidden = false;
        this._linkSeeAllColors.hidden = true;
      }) 
    }
    this._linkSeeAllColors.addEventListener("click", function (event) {
      event.preventDefault();
      checkboxHidden.forEach((checkbox, i) => {
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
