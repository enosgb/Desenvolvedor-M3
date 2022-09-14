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
                  `<div class="content__container__product">
                    <img class="content__container__img_product" src="${p.image}" />
                    <h3 class="content__container__product_title">${p.name}</h3>
                    <h3 class="content__container__product_price">R$ ${p.price.toFixed(2)}</h3>
                    <h3 class="content__container__product_subdivision">até ${
                      p.parcelamento[0]
                    }x de R$${p.parcelamento[1].toFixed(2)}</h3>
                    <button id=${p.id} class="content__container__btn_purchase">Comprar</button>
                </div>`
              )
              .join("")}
            `;
  }
}
