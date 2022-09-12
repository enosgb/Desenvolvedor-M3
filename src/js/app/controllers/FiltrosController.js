import { ListaFiltros } from "../models/ListaFiltros";

export class FiltrosController {
  constructor(
    listaProdutos,
    produtosView,
    btnCarregarmais,
    btnTamanhos,
    checkboxCores
  ) {
    this._listaFiltros = new ListaFiltros();
    this._listaProdutos = listaProdutos;
    this._produtosView = produtosView;
    this._btnCarregarMais = btnCarregarmais;
    this._btnTamanhos = btnTamanhos;
    this._checkboxCores = checkboxCores;
  }

  filtros() {
    let todosProdutos = this._listaProdutos;
    let listaFiltros = this._listaFiltros;
    let checkboxCores = this._checkboxCores;
    let produtosView = this._produtosView;
    let btnCarregarmais = this._btnCarregarMais;
    let btnTamanhos = this._btnTamanhos;
    let semResultados = true;

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
        filtraPorTamanho(
          listaFiltros.produtos,
          produtosView,
          btnTamanhos,
          btnCarregarmais
        );
        return (semResultados = false);
      } else {
        if (semResultados) {
          produtosView.update([]);
          filtraPorTamanho([], produtosView, btnTamanhos, btnCarregarmais);
          if (listaFiltros.produtos.length < 9) btnCarregarmais.hidden = true;
          return (semResultados = false);
        } else {
          produtosView.update(todosProdutos.slice(0, 9));
          filtraPorTamanho(
            todosProdutos.slice(0, 9),
            produtosView,
            btnTamanhos,
            btnCarregarmais
          );
          if (todosProdutos.length > 9) btnCarregarmais.hidden = false;
          return (semResultados = false);
        }
      }
    }

    function verificaCheckboxChecked(
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
          semResultados = verificaCheckboxChecked(
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

    function filtraPorTamanho(
      listaFiltros,
      produtosView,
      btnTamanhos,
      btnCarregarmais
    ) {
      let todosTamanhos = listaFiltros;
      btnTamanhos.addEventListener("click", function (event) {
        event.preventDefault();
        let btn = event.target.classList;
        if (!event.target.classList.contains("tamanhos"))
          if (btn.length > 1) {
            produtosView.update(todosTamanhos.slice(0, 9));
            btn.remove("tamanho_active");
            if (todosTamanhos.length >= 9) btnCarregarmais.hidden = false;
          } else {
            btn.add("tamanho_active");
            let tamanho = event.target.textContent;

            let listaTamanhos = listaFiltros.filter((p) =>
              p.size.includes(tamanho)
            );
            if (listaTamanhos.length > 0) {
              let ativo = document.querySelectorAll(".tamanho_active");
              ativo.forEach((value, i) => {
                value.classList.remove("tamanho_active");
              });
              btn.add("tamanho_active");
              produtosView.update(listaTamanhos);
              btnCarregarmais.hidden = true;
            } else {
              produtosView.update([]);
              btnCarregarmais.hidden = true;
            }
          }
      });
    }
    realizaFiltros();
    filtraPorTamanho(
      this._listaProdutos,
      produtosView,
      btnTamanhos,
      btnCarregarmais
    );
  }
}
