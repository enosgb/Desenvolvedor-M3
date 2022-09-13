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
                <div class="div_carrinho">
                  <img class="img_item_carrinho" src="${c.image}"/>
                  <div class="descricao_c_carrinho">
                    <p class="produto_title">${c.name}</p>
                    <p class="produto_preco">R$ ${c.price.toFixed(2)}</p>
                    <p class="produto_parcelamento">até ${c.parcelamento[0].toFixed(
                      2
                    )}x de R$${c.parcelamento[1].toFixed(2)}</p>
                    <a id="${c.id}" class="link_RemoverDoCarrinho" href="">Remover do carrinho</a>
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
            class="img_sacola"
            src="./img/image 3.png"
            alt="Imagem de uma sacola"/>
            <span  class="span_numero_compras">${numItemsChart}</span>
            `;
    } else {
      chart.innerHTML = `
                  <img
                  class="img_sacola"
                  src="./img/image 3.png"
                  alt="Imagem de uma sacola"/>
                  `;
    }
  }

  chartEmpty(chart){
    chart.innerHTML = ` <p class="produto_title">O carrinho está vazio</p>`
  }

}
