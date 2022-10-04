import { View } from "./View";

export class CartView extends View {
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
                    <p class="header__amountItems"> 
                      <button name="${c.id}" id="btn_amount_minus" class="header__btn_amount" >
                        <img class="header__img_amount" src="/img/minus.png" />
                      </button> 
                      <a id="set_amount${c.id}">1</a>
                      <button name="${c.id}" id="btn_amount_plus" class="header__btn_amount" >
                        <img class="header__img_amount" src="/img/plus.png" />
                      </button> 
                    <p/>
                    <a id="${c.id}" class="header__remover-item-cart" href="">Remover do carrinho</a>
                  </div>
                </div>
              `
              )
              .join("")}
            `;
  }
  
  
    
  

  countItemsCart(numItemsCart, cart) {
    if (numItemsCart > 0) {
      cart.innerHTML = `
            <img
            class="header__img_bag"
            src="./img/image 3.png"
            alt="Imagem de uma sacola"/>
            <span  class="header__total_purchases">${numItemsCart}</span>
            `;
    } else {
      cart.innerHTML = `
                  <img
                  class="header__img_bag"
                  src="./img/image 3.png"
                  alt="Imagem de uma sacola"/>
                  `;
    }
  }

  cartEmpty(cart){
    cart.innerHTML = ` <p class="content__container__product_title">O carrinho está vazio</p>`
  }

}
