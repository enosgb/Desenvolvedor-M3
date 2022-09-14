import { View } from "./View";

export class ChartView extends View {
  constructor(element) {
    super(element);
  }

  template(purchases) {
    return `
            ${purchases
              .map(
                (c) =>
                  `
                <div class="header__view_cart ">
                  <img class="header__img_item_cart" src="${c.image}"/>
                  <div class="header__item_description_cart">
                    <p class="content__container__product_title">${c.name}</p>
                    <p class="content__container__product_price">R$ ${c.price.toFixed(2)}</p>
                    <p class="content__container__product_subdivision">até ${c.parcelamento[0].toFixed(
                      2
                    )}x de R$${c.parcelamento[1].toFixed(2)}</p>
                    <a id="${c.id}" class="header__remover-item-chart" href="">Remover do carrinho</a>
                  </div>
                </div>
              `
              )
              .join("")}
            `;
  }
  
  
    
  

  countItemsChart(numItemsChart, chart) {
    if (numItemsChart > 0) {
      chart.innerHTML = `
            <img
            class="header__img_bag"
            src="./img/image 3.png"
            alt="Imagem de uma sacola"/>
            <span  class="header__total_purchases">${numItemsChart}</span>
            `;
    } else {
      chart.innerHTML = `
                  <img
                  class="header__img_bag"
                  src="./img/image 3.png"
                  alt="Imagem de uma sacola"/>
                  `;
    }
  }

  chartEmpty(chart){
    chart.innerHTML = ` <p class="content__container__product_title">O carrinho está vazio</p>`
  }

}
