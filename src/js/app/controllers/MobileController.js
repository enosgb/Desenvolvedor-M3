export class MobileController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._mobile_buttons = $(".content__container__mobile_buttons");
    this._mb_title = $(".content__sidebar_title");
    this._mb_btnFilters = $(".content__container__mobile_buttons");
    this._mb_products = $(".content__container");
    this._mb_footer = $(".footer");
    this._sidebar = $(".content__sidebar");
  }

  mobile() {
    let $ = document.querySelector.bind(document);
    let mobile_buttons = this._mobile_buttons;
    let mb_title = this._mb_title;
    let mb_btnFilters = this._mb_btnFilters;
    let mb_products = this._mb_products;
    let mb_footer = this._mb_footer;
    let sidebar = this._sidebar;

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
        mb_title.classList.add("mobile_hide");
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
        hideAndUnhideScreen();
        if (event.target.id == "btn_mobile_filter") {
          sidebar.style.display = "block";
        } else {
          hideAndUnhideSelectMobile();
        }
      });
    }

    mobileButtons();
  }
}
