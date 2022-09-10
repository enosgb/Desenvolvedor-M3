import { ProdutosView } from "../views/ProdutosView";
import { ListaProdutos } from "../models/ListaProdutos";
import { CarrinhoView } from "../views/CarrinhoView";
import { ListaCompras } from "../models/LIstaCompras";

export class ProdutoController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._carrinho = $(".span_carrinho");
    this._carrinho.hidden = true;
    this._listaProdutos = new ListaProdutos();
    this._produtosView = new ProdutosView($("#produtos"));
    this._btnCarregarMais = $(".container button");
    this._btnComprar = $(".grid_container");
    this._btnSacola = $(".btn_sacola");
    this._carrinhoView = new CarrinhoView(this._carrinho);
    this._listaCompras = new ListaCompras();
  }

  _getProdutos() {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((produtos) => {
        this._listaProdutos.adiciona(produtos);
        this._produtosView.update(this._listaProdutos.produtos.slice(0, 9));
        this._getMaisProdutos(this._listaProdutos.produtos);
      });
  }

  _getMaisProdutos(produtos) {
    let length = 9;
    let listaProdutos = this._listaProdutos;
    let produtosView = this._produtosView;
    this._btnCarregarMais.addEventListener("click", function () {
      length += 9;
      produtosView.update(listaProdutos.produtos.slice(0, length));
      if (produtos.length <= length) {
        this.hidden = true;
      }
    });
  }

  _carrinhoSpan() {
    let carrinho = this._carrinho;
    let carrinhoView = this._carrinhoView;
    let listaCompras = this._listaCompras;
    let btn_sacola = document.querySelector(".header_itens button")
    btn_sacola.addEventListener("click", function () {
      let numCompras = listaCompras.compras.length
      if (carrinho.hidden) {
        carrinho.hidden = false;
        if(numCompras <= 0)  carrinhoView.carrinhoVazio(carrinho);
      } else {
        carrinho.hidden = true;
      }
    });
  }
  _comprar() {
    let listaProdutos = this._listaProdutos;
    let carrinhoView = this._carrinhoView;
    let listaCompras = this._listaCompras;
    let carrinho = this._btnSacola;
    this._btnComprar.addEventListener("click", function (event) {
      let id = event.target.id - 1;
      if (id >= 0) {
        listaCompras.adiciona(listaProdutos.produtos[id]);
        carrinhoView.update(listaCompras.compras);
        carrinhoView.contaItensCarrinho(listaCompras.compras.length, carrinho);
      }
    });
  }

  _removeItemCarrinho() {
    let listaCompras = this._listaCompras;
    let carrinhoView = this._carrinhoView;
    let carrinho = this._carrinho;
    let btnSacola = this._btnSacola;
    this._carrinho.addEventListener("click", function (event) {
      event.preventDefault();
      let id = event.target.id;
      if (id => 0) {
        listaCompras.remove(id);
        carrinhoView.update(listaCompras.compras);
        carrinhoView.contaItensCarrinho(listaCompras.compras.length, btnSacola);
        if(listaCompras.compras.length <= 0) carrinho.hidden = true;
      }
    });
  }

  carregarPagina() {
    this._getProdutos();
    this._comprar();
    this._carrinhoSpan();
    this._removeItemCarrinho();
  }
}
