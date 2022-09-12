import { ListaFiltros } from "../models/ListaFiltros";
import { FiltroTamanhoController } from "./FiltroTamanhoController";
import { FiltroPrecoController } from "./FiltroPrecoController";

export class FiltroCorController {
  constructor(
    listaProdutos,
    produtosView,
    btnCarregarmais,
    btnTamanhos,
    checkboxCores
  ) {
    let $ = document.querySelector.bind(document);
    this._listaFiltros = new ListaFiltros();
    this._listaProdutos = listaProdutos;
    this._produtosView = produtosView;
    this._btnCarregarMais = btnCarregarmais;
    this._btnTamanhos = btnTamanhos;
    this._checkboxCores = checkboxCores;
    this._filtroTamanhoController = new FiltroTamanhoController();
    this._filtroPrecoController = new FiltroPrecoController();
  }

  get instanciaPrecosController(){
    return this._filtroPrecoController();
  }

  filtrarPorCor() {
    let todosProdutos = this._listaProdutos;
    let listaFiltros = this._listaFiltros;
    let checkboxCores = this._checkboxCores;
    let produtosView = this._produtosView;
    let btnCarregarmais = this._btnCarregarMais;
    let btnTamanhos = this._btnTamanhos;
    let semResultados = true;
    let filtroTamanhoController = this._filtroTamanhoController;
    let filtroPrecoController = this._filtroPrecoController;

    function verificaFiltros(
      listaFiltros,
      produtosView,
      btnCarregarmais,
      semResultados,
      btnTamanhos
    ) {
      if (listaFiltros.produtos.length > 0) {
        produtosView.update(listaFiltros.produtos);
        if (listaFiltros.produtos.length < 9) btnCarregarmais.hidden = true;
        filtroTamanhoController.filtraPorTamanho(
          listaFiltros.produtos,
          produtosView,
          btnTamanhos,
          btnCarregarmais
        );
        filtroPrecoController.filtroPorPreco(
          listaFiltros.produtos,          
          produtosView,
          btnCarregarmais
        );
        return (semResultados = false);
      } else {
        if (semResultados) {
          produtosView.update([]);
          filtroTamanhoController.filtraPorTamanho(
            [],
            produtosView,
            btnTamanhos,
            btnCarregarmais
          );
          filtroPrecoController.filtroPorPreco(
            [],            
            produtosView,
            btnCarregarmais
          );
          if (listaFiltros.produtos.length < 9) btnCarregarmais.hidden = true;
          return (semResultados = false);
        } else {
          produtosView.update(todosProdutos.slice(0, 9));
          filtroTamanhoController.filtraPorTamanho(
            todosProdutos.slice(0, 9),
            produtosView,
            btnTamanhos,
            btnCarregarmais
          );
          filtroPrecoController.filtroPorPreco(
            todosProdutos.slice(0,9),            
            produtosView,
            btnCarregarmais
          );
          if (todosProdutos.length > 9) btnCarregarmais.hidden = false;
          return (semResultados = false);
        }
      }
    }

    function verificaCheckboxCores(
      children,
      semResultados,
      todosProdutos,
      listaFiltros
    ) {
      let arr = Array.from(children);
      arr.forEach((value, i) => {
        let checkbox = value.firstChild.nextSibling;
        let checked = checkbox.checked;
        let cor = checkbox.parentElement.lastElementChild.textContent;
        if (checked == true) {
          todosProdutos.forEach((p, i) => {
            if (p.color == cor) {
              listaFiltros.adicionar(p);
              semResultados = false;
            } else {
              semResultados = true;
            }
          });
        }
      });
      return semResultados;
    }

    function realizaFiltros() {
      checkboxCores.addEventListener("click", function (event) {
        if (!event.target.classList.contains("checkbox")) {
          listaFiltros.limpar();
          semResultados = verificaCheckboxCores(
            this.children,
            semResultados,
            todosProdutos,
            listaFiltros
          );
          semResultados = verificaFiltros(
            listaFiltros,
            produtosView,
            btnCarregarmais,
            semResultados,
            btnTamanhos
          );
        }
      });
    }

    realizaFiltros();
    this._filtroTamanhoController.filtraPorTamanho(
      this._listaProdutos,
      produtosView,
      btnTamanhos,
      btnCarregarmais
    );
    this._filtroPrecoController.filtroPorPreco(
      this._listaProdutos,
      produtosView,
      btnCarregarmais
    );
  }
}
