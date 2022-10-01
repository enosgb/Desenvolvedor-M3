export class MobileController {
  constructor() {
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
  }

  mobile() {
    let mobile_buttons = this._mobile_buttons;
    let mb_subcontent = this._mb_subcontent;
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
    let mb_submit_buttons = this._mb_submit_buttons;

    function hideAndUnhideScreen(action="hide") {
      if (action == "show") {
        mb_subcontent.classList.add("content__subheader");
        mb_subcontent.classList.remove("hide-mobile");
        mb_title.style.display = "block";
        mb_btnFilters.style.display = "flex";
        mb_products.style.display = "block";
        mb_footer.style.display = "block";
      } 
      if (action == "hide"){
        mb_subcontent.classList.remove("content__subheader");
        mb_subcontent.classList.add("hide-mobile");
        mb_title.style.display = "none";
        mb_btnFilters.style.display = "none";
        mb_products.style.display = "none";
        mb_footer.style.display = "none";
      }
    }

    function hideAndUnhideSelectMobile() {
      let $ = document.querySelector.bind(document);
      let select_orderby_content = $(
        ".content__container__select_oderby_content"
      );
      let select_orderby = $(".content__container__select_orderby");
      select_orderby_content.style.display = "block";
      select_orderby.style.display = "block";
    }

    function mobileButtons() {
      mobile_buttons.addEventListener("click", function (event) {
        event.preventDefault();
        expandDivMobile(content_div_colors, mb_div_colors, "block");
        expandDivMobile(content_div_sizes, mb_div_sizes, "flex");
        expandDivMobile(content_div_prices, mb_div_prices, "block");
        submitFiltersMobile();
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
        if (content.style.display == "block") content.style.display = "none";
        else if (content.style.display == "flex")
          content.style.display = "none";
        else content.style.display = display;
      });
    }

    function submitFiltersMobile() {
      mb_submit_buttons.addEventListener("click",function(event){
        hideAndUnhideScreen("show");
        sidebar.style.display = "none";
        expandDivMobile(content_div_colors, mb_div_colors, "block");
        expandDivMobile(content_div_sizes, mb_div_sizes, "flex");
        expandDivMobile(content_div_prices, mb_div_prices, "block");
      })
    }

    mobileButtons();
  }
}
