import { ProdutosView } from "../views/ProdutosView";
import { FiltroCorController } from "./FiltroCorController";

export class SidebarController {
  constructor(listaProdutos) {
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);
    this._linkVerTodasCores = $("#verTodasAsCores");
    this._checkboxHidden = $$("#checkboxHidden");
    this._checkboxCores = $("#checkboxCores");
    this._listaProdutos = listaProdutos;
    this._produtosView = new ProdutosView($("#produtos"));
    this._btnCarregarMais = $(".btn_carregarMais");
    this._btnTamanhos = $(".tamanhos");
    this._filtroCorController = new FiltroCorController(
      this._listaProdutos,
      this._produtosView,
      this._btnCarregarMais,
      this._btnTamanhos,
      this._checkboxCores
    );
  }

  _verTodasCores() {
    let checkboxHidden = this._checkboxHidden;
    this._linkVerTodasCores.addEventListener("click", function (event) {
      event.preventDefault();
      checkboxHidden.forEach((checkbox, i) => {
        checkbox.hidden = false;
      });
      this.hidden = true;
    });
  }

  carregarSidebar() {
    this._verTodasCores();
    this._filtroCorController.filtrarPorCor();
  }
}
