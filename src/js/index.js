let produtos = "";
function getProducts() {
  const elemento = document.getElementById("produtos");
  document.querySelector(".span_carrinho").hidden = true;
  fetch("http://localhost:5000/products")
    .then((response) => response.json())
    .then((data) => {
      produtos = data;
      produtos.slice(0, 9).forEach((item, i) => {
        const template = `
          <div class="produto">
              <img src="${item.image}" />
              <h3 class="produto_title">${item.name}</h3>
              <h3 class="produto_preco">R$ ${item.price.toFixed(2)}</h3>
              <h3 class="produto_parcelamento">até ${
                item.parcelamento[0]
              }x de R$${item.parcelamento[1].toFixed(2)}</h3>
              <button id=${item.id} class="btn_comprar">Comprar</button>
          </div>`;
        elemento.innerHTML += template;
      });
    });
}

function btn_sacola() {
  const btn = document.querySelector(".btn_sacola");
  btn.addEventListener("click", function () {
    const countItens = document.querySelectorAll(".div_carrinho div").length;
    const carrinho = document.querySelector(".span_carrinho");
    if (carrinho && countItens <= 0) {
      carrinho.innerHTML = `<p class="produto_title">Seu carrinho esta vazio!</p>`;
      if (!carrinho.hidden) {
        carrinho.innerHTML = "";
      }
    }
    if (carrinho.hidden) {
      carrinho.hidden = false;
    } else {
      carrinho.hidden = true;
    }
  });
}

function CountCarrinhoItens() {
  const carrinho = document.querySelector(".btn_sacola");
  const countItens = document.querySelectorAll(".div_carrinho div").length;
  if (countItens > 0) {
    carrinho.innerHTML += `
    <span  class="span_numero_compras">${countItens}</span>
    `;
  } else {
    carrinho.innerHTML = `
          <img
          class="img_sacola"
          src="./img/image 3.png"
          alt="Imagem de uma sacola"/>
          `;
  }
}

function removerDoCarrinho() {
  const carrinho = document.querySelector(".span_carrinho");
  const link = document.querySelectorAll(".link_RemoverDoCarrinho");
  link.forEach((link, i) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      carrinho.innerHTML = "";
      carrinho.hidden = true;
      CountCarrinhoItens();
    });
  });
}

function btnComprar() {
  const carrinho = document.querySelector(".span_carrinho");
  const btn = document.querySelectorAll(".btn_comprar");
  btn.forEach((btn, i) => {
    btn.addEventListener("click", function (event) {
      const id = event.target.id - 1;
      const item = produtos[id];
      carrinho.innerHTML += `
        <div class="div_carrinho">
          <img class="img_item_carrinho" src="${item.image}"/>
          <div class="descricao_item_carrinho">
            <p class="produto_title">${item.name}</p>
            <p class="produto_preco">R$ ${item.price.toFixed(2)}</p>
            <p class="produto_parcelamento">até ${item.parcelamento[0].toFixed(
              2
            )}x de R$${item.parcelamento[1].toFixed(2)}</p>
            <a class="link_RemoverDoCarrinho" href="">Remover do carrinho</a>
          </div>
        </div>
      `;
      removerDoCarrinho();
      CountCarrinhoItens();
    });
  });
}

function checkbox() {
  const checkbox = document.querySelectorAll(".checkbox");
  checkbox.forEach((checkbox, i) => {
    checkbox.addEventListener("change", function (event) {
      console.log(event.target.labels[0].innerText.trim());
    });
  });
}

function verTodasAsCores() {
  const link = document.querySelector(".link_verTodasAsCores");
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const checkboxCores = document.querySelectorAll(
      "#checkboxCores #checkboxHidden"
    );
    checkboxCores.forEach((checkboxCores, i) => {
      checkboxCores.hidden = false;
    });
    link.hidden = true;
  });
}

function selectTamanhos() {
  const tamanho = document.querySelectorAll(".caixa_tamanhos");
  tamanho.forEach((tamanho, i) => {
    tamanho.addEventListener("click", function (event) {
      console.log(event.target.textContent.trim());
    });
  });
}

function btnCarregarMais() {
  const btn = document.querySelector(".btn_carregarMais");
  const elemento = document.getElementById("produtos");
  btn.addEventListener("click", function () {
    produtos.slice(-5).forEach((item, i) => {
      const template = `
        <div class="produto">
            <img src="${item.image}" />
            <h3 class="produto_title">${item.name}</h3>
            <h3 class="produto_preco">R$ ${item.price.toFixed(2)}</h3>
            <h3 class="produto_parcelamento">até ${
              item.parcelamento[0]
            }x de R$${item.parcelamento[1].toFixed(2)}</h3>
            <button id=${item.id} class="btn_comprar">Comprar</button>
        </div>`;
      elemento.innerHTML += template;
    });
    btn.hidden = true;
    btnComprar();
  });
}

window.onload = function () {
  btn_sacola();
  btnComprar();
  checkbox();
  selectTamanhos();
  btnCarregarMais();
  verTodasAsCores();
};

getProducts();
