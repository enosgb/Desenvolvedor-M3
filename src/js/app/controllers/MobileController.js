export class MobileController {
  constructor(productList, productView, lenProducts,filterList) {
    this._productsList = productList;
    this._productView = productView;
    this._lenProducts = lenProducts;
    this._filterList = filterList;
  }

  mobile() {
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);
    let mobile_buttons = $(".content__container__mobile_buttons");
    let sidebar = $(".content__sidebar");
    let mb_div_colors = $("#mb_div_colors");
    let mb_div_sizes = $("#div_mb_sizes");
    let mb_div_prices = $("#div_mb_prices");
    let content_div_colors = $(".content__sidebar__checkboxes_colors");
    let content_div_sizes = $(".content__sidebar__sizes");
    let content_div_prices = $(".content__sidebar__prices");
    let mb_submit_buttons = $(".content__sidebar__btn_submit_filters");
    let mobileController = new MobileController();
    let header = $(".header__items");
    let header_mobile_filters = $(".header__items_mobile");
    let header_mobile_filters_title = $(".header__mobile_title");
    let header_mobile_btn_close = $("#mb_btn_close");
    let checkbox_colorsAndPrices = $$(".content__sidebar__checkbox input");
    let checkbox_sizes = $$(".content__sidebar__checkbox_sizes input");
    let btn_load_more = $(".content__container__btn_load_more")
    let filterList = this._filterList;
    let productList = this._productsList;
    let productView = this._productView;
    let lenProducts = this._lenProducts;

    function hideAndUnhideHeaderMobile(text = "filtrar") {
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
      mobile_buttons.addEventListener("click", function (event) {
        event.preventDefault();
        mobileController.hideAndUnhideScreen();
        if (event.target.id == "btn_mobile_filter") {
          showMobileSidebar();
          hideAndUnhideHeaderMobile("filtrar");
          if (
            content_div_colors.style.display == "block" ||
            content_div_sizes.style.display == "flex" ||
            content_div_prices.style.display == "block"
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
          closeFilters();
        }
        if (event.target.id == "btn_clean") {
          cleanFilters();
        }
      });
    }

    function cleanFilters() {
      checkbox_colorsAndPrices.forEach((checkbox) => {
        if (checkbox.checked == true) checkbox.checked = false;
      });
      checkbox_sizes.forEach((checkbox) => {
        if (checkbox.checked == true) checkbox.checked = false;
      });
      productView.update(productList.slice(0, lenProducts));
      btn_load_more.hidden = false;
      filterList.clearProducts();
    }

    function showBtnSubmitButtons(display = "flex") {
      mb_submit_buttons.style.display = display;
    }

    function showMobileSidebar(display = "block") {
      sidebar.style.display = display;
    }

    function btnCloseFilters() {
      header_mobile_btn_close.addEventListener("click", function () {
        closeFilters();
      });
    }

    function closeFilters() {
      hideAndUnhideHeaderMobile();
      mobileController.hideAndUnhideScreen("show");
      showMobileSidebar("none");
      showBtnSubmitButtons("none");
    }

    mobileButtons();
    btnCloseFilters();
    submitFiltersMobile();
  }

  hideAndUnhideScreen(action = "hide") {
    let $ = document.querySelector.bind(document);
    let mb_subcontent = $("#content__subheader");
    let mb_title = $(".content__sidebar_title");
    let mb_btnFilters = $(".content__container__mobile_buttons");
    let mb_products = $(".content__container");
    let mb_footer = $(".footer");
    let mb_select_orderby = $(".content__container__select_orderby");
    let header_mobile_filters = $(".header__items_mobile");
    let header = $(".header__items");

    if (action == "show") {
      mb_subcontent.classList.add("content__subheader");
      mb_subcontent.classList.remove("hide-mobile");
      mb_title.style.display = "block";
      mb_btnFilters.style.display = "flex";
      mb_products.style.display = "block";
      mb_footer.style.display = "block";
      mb_select_orderby.style.display = "none";
      header_mobile_filters.style.display = "none";
      header.style.display = "flex";
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
