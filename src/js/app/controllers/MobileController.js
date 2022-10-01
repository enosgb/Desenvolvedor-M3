export class MobileController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._mobile_buttons = $(".content__container__mobile_buttons");
    this._mb_title = $(".content__sidebar_title");
    this._mb_btnFilters = $(".content__container__mobile_buttons");
    this._mb_products = $(".content__container");
    this._mb_footer = $(".footer");
    this._sidebar = $(".content__sidebar");
    this._mb_div_colors = $("#mb_div_colors");
    this._mb_div_sizes = $("#div_mb_sizes");
    this._mb_div_prices = $("#div_mb_prices");
    this._content_div_colors = $(".content__sidebar__checkboxes_colors");
    this._content_div_sizes = $(".content__sidebar__sizes");
    this._content_div_prices = $(".content__sidebar__prices");
  }

  mobile() {
    let $ = document.querySelector.bind(document);
    let mobile_buttons = this._mobile_buttons;
    let mb_title = this._mb_title;
    let mb_btnFilters = this._mb_btnFilters;
    let mb_products = this._mb_products;
    let mb_footer = this._mb_footer;
    let sidebar = this._sidebar;
    let mb_div_colors = this._mb_div_colors;
    let mb_div_sizes = this._mb_div_sizes;
    let mb_div_prices = this._mb_div_prices;
    let content_div_colors = this._content_div_colors;
    let content_div_sizes = this._content_div_sizes;
    let content_div_prices = this._content_div_prices;

    function hideAndUnhideScreen() {
      if (mb_footer.classList.contains("mobile_hide")) {
        mb_title.classList.add("content__sidebar_title");
        mb_btnFilters.add("content__container__mobile_buttons");
        mb_title.classList.remove("mobile_hide");
        mb_btnFilters.classList.remove("mobile_hide");
        mb_products.classList.remove("mobile_hide");
        mb_footer.classList.remove("mobile_hide");
      } else {
        mb_title.classList.remove("content__sidebar_title");
        mb_btnFilters.remove("content__container__mobile_buttons");
        mb_title.style.add("mobile_hide");
        mb_btnFilters.classList.add("mobile_hide");
        mb_products.classList.add("mobile_hide");
        mb_footer.classList.add("mobile_hide");
      }
    }

    function hideAndUnhideSelectMobile() {
      let $ = document.querySelector.bind(document);
      let btn_select_order = $(".content__container__btn_select_oderby");
      let select_orderby_content = $(
        ".content__container__select_oderby_content"
      );
      let select_orderby = $(".content__container__select_orderby");
      //btn_select_order.style.display = "block";
      select_orderby_content.style.display = "block";
      select_orderby.style.display = "block";
    }

    function mobileButtons() {
      mobile_buttons.addEventListener("click", function (event) {
        event.preventDefault();
        expandDivMobile(content_div_colors, mb_div_colors, "block");
        expandDivMobile(content_div_sizes, mb_div_sizes, "flex");
        expandDivMobile(content_div_prices, mb_div_prices, "block");
        hideAndUnhideScreen();
        if (event.target.id == "btn_mobile_filter") {
          sidebar.style.display = "block";
        } else {
          hideAndUnhideSelectMobile();
        }
      });
    }

    function expandDivMobile(content, div, display) {
      div.addEventListener("click", function (event) {
        if (content.style.display == "none") content.style.display = display;
        else content.style.display = "none";
      });
    }

    mobileButtons();
  }
}
