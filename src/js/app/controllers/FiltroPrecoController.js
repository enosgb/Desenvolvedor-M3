import { ListaFiltros } from "../models/ListaFiltros";

export class FiltroPrecoController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._checkboxPreco = $(".checkboxPrecos");
    this._listaFiltros = new ListaFiltros();
    this._btnTamanhos = $(".tamanhos");
  }

  filtroPorPreco(listaProdutos, produtosView, btnCarregarmais) {
    let listaFiltros = this._listaFiltros;
    let todosProdutos = listaProdutos;
    let btnTamanhos = this._btnTamanhos;
    let semResultados = true;
    this._checkboxPreco.addEventListener("click", function (event) {
      if (!event.target.classList.contains("checkbox")) {
        listaFiltros.limpar();

        let arr = Array.from(this.children);

        arr.forEach((value, i) => {
          let checkbox = value.firstChild.nextSibling;
          let checked = checkbox.checked;
          let from = checkbox.id.split("-")[0];
          let to = checkbox.id.split("-")[1];
          if (checked == true) {
            listaProdutos.forEach((p, i) => {
              if (p.price >= from && p.price <= to) {
                listaFiltros.adicionar(p);
                semResultados = false;
              } else {
                semResultados = true;
              }
            });
          }
        });
        if (listaFiltros.produtos.length > 0) {
          produtosView.update(listaFiltros.produtos);
          if (listaFiltros.produtos.length < 9) btnCarregarmais.hidden = true;
          semResultados = false;
        } else {
          if (semResultados) {
            produtosView.update([]);
            if (listaFiltros.produtos.length < 9) btnCarregarmais.hidden = true;
            semResultados = false;
          } else {
            produtosView.update(todosProdutos.slice(0, 9));

            if (todosProdutos.length >= 9) {
              btnCarregarmais.hidden = false;
            } else {
              btnCarregarmais.hidden = true;
            }
          }
        }
      }
    });
  }
}
