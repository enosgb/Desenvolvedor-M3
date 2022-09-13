import { View } from "./View.js";

export class ProductsView extends View {
  constructor(element) {
    super(element);
  }

  template(products) {
    return `
            ${products
              .map(
                (p) =>
                  `<div class="produto">
                    <img src="${p.image}" />
                    <h3 class="produto_title">${p.name}</h3>
                    <h3 class="produto_preco">R$ ${p.price.toFixed(2)}</h3>
                    <h3 class="produto_parcelamento">até ${
                      p.parcelamento[0]
                    }x de R$${p.parcelamento[1].toFixed(2)}</h3>
                    <button id=${p.id} class="btn_comprar">Comprar</button>
                </div>`
              )
              .join("")}
            `;
  }
}
