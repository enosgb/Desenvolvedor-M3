export class MobileController {
  constructor(filterList) {
    let $ = document.querySelector.bind(document);
    this._mobile_buttons = $(".content__container__mobile_buttons");
    this._mb_subcontent = $("#content__subheader");
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
    this._mb_submit_buttons = $(".content__sidebar__btn_submit_filters");
    this._mb_select_orderby = $(".content__container__select_orderby");
    this._header_default = $(".header__items");
    this._header_mobile_filters = $(".header__items_mobile");
    this._header_mobile_filters_title = $('.header__mobile_title')
    this._filterList = filterList;
  }

  mobile() {
    let mobile_buttons = this._mobile_buttons;
    let sidebar = this._sidebar;
    let mb_div_colors = this._mb_div_colors;
    let mb_div_sizes = this._mb_div_sizes;
    let mb_div_prices = this._mb_div_prices;
    let content_div_colors = this._content_div_colors;
    let content_div_sizes = this._content_div_sizes;
    let content_div_prices = this._content_div_prices;
    let mb_submit_buttons = this._mb_submit_buttons;
    let mobileController = new MobileController();
    let filterList = this._filterList;
    let header = this._header_default;
    let header_mobile_filters = this._header_mobile_filters;
    let header_mobile_filters_title = this._header_mobile_filters_title

    function hideAndUnhideHeaderMobile(text) {
      header_mobile_filters_title.textContent = text;
      if (header.style.display == "none") {
        header.style.display = "flex";
        header_mobile_filters.style.display = "none";
      } else {
        header.style.display = "none";
        header_mobile_filters.style.display = "flex";
      }
    }

    function mobileButtons() {
      expandDivMobile(content_div_colors, mb_div_colors, "block");
      expandDivMobile(content_div_sizes, mb_div_sizes, "flex");
      expandDivMobile(content_div_prices, mb_div_prices, "block");
      submitFiltersMobile();
      mobile_buttons.addEventListener("click", function (event) {
        event.preventDefault();
        mobileController.hideAndUnhideScreen();
        if (event.target.id == "btn_mobile_filter") {
          sidebar.style.display = "block";
          hideAndUnhideHeaderMobile("filtrar");
          if (
            content_div_colors.style.display != "none" ||
            content_div_sizes.style.display != "none" ||
            content_div_prices.style.display != "none"
          ) {
            showBtnSubmitButtons();
          }
        } else {
          mobileController.hideAndUnhideSelectMobile("block");
          hideAndUnhideHeaderMobile("ordenar");
        }
      });
    }

    function expandDivMobile(content, div, display) {
      div.addEventListener("click", function (event) {
        if (content.style.display == "block") {
          content.removeAttribute("style");
          content.style.display = "none";
        } else if (content.style.display == "flex") {
          content.removeAttribute("style");
          content.style.display = "none";
        } else {
          showBtnSubmitButtons();
          content.removeAttribute("style");
          content.style.display = display;
        }
      });
    }

    function submitFiltersMobile() {
      mb_submit_buttons.addEventListener("click", function (event) {
        if (event.target.id == "btn_apply") {
          mobileController.hideAndUnhideScreen("show");
          showBtnSubmitButtons("none");
          sidebar.style.display = "none";
          hideAndUnhideHeaderMobile();
        }
        if (event.target.id == "btn_clean") {
          cleanFilters();
        }
      });
    }

    function cleanFilters() {
      let $$ = document.querySelectorAll.bind(document);
      let checkbox_colorsAndPrices = $$(".content__sidebar__checkbox input");
      let checkbox_sizes = $$(".content__sidebar__checkbox_sizes input");

      checkbox_colorsAndPrices.forEach((checkbox) => {
        if (checkbox.checked == true) {
          checkbox.checked = false;
        }
      });

      checkbox_sizes.forEach((checkbox) => {
        if (checkbox.checked == true) {
          checkbox.checked = false;
        }
      });
    }

    function showBtnSubmitButtons(display = "flex") {
      mb_submit_buttons.style.display = display;
    }

    mobileButtons();
  }

  hideAndUnhideScreen(action = "hide") {
    let mb_subcontent = this._mb_subcontent;
    let mb_title = this._mb_title;
    let mb_btnFilters = this._mb_btnFilters;
    let mb_products = this._mb_products;
    let mb_footer = this._mb_footer;
    let mb_select_orderby = this._mb_select_orderby;

    if (action == "show") {
      mb_subcontent.classList.add("content__subheader");
      mb_subcontent.classList.remove("hide-mobile");
      mb_title.style.display = "block";
      mb_btnFilters.style.display = "flex";
      mb_products.style.display = "block";
      mb_footer.style.display = "block";
      mb_select_orderby.style.display = "none";
    }
    if (action == "hide") {
      mb_subcontent.classList.remove("content__subheader");
      mb_subcontent.classList.add("hide-mobile");
      mb_title.style.display = "none";
      mb_btnFilters.style.display = "none";
      mb_products.style.display = "none";
      mb_footer.style.display = "none";
    }
  }

  hideAndUnhideSelectMobile(display = "none") {
    let $ = document.querySelector.bind(document);
    let select_orderby_content = $(
      ".content__container__select_oderby_content"
    );
    let select_orderby = $(".content__container__select_orderby");
    select_orderby_content.style.display = display;
    select_orderby.style.display = display;
  }
}
