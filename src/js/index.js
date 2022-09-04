function getProducts() {
  const elemento = document.getElementById("produtos");

  fetch("http://localhost:5000/products")
    .then((response) => response.json())
    .then((data) => {
      let produtos = data;
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

function btn_sacola(){
  const btn = document.querySelector('.btn_sacola');
  btn.onclick = function(){
    console.log('btn sacola clicked')
  }
}

function btnComprar() {
  const btn = document.querySelectorAll(".btn_comprar");
  btn.forEach((btn, i) => {
    btn.onclick = function (event) {
      console.log(event.target.id);
    };
  });
}

function checkbox() {
  const checkbox = document.querySelectorAll(".checkbox");
  checkbox.forEach((checkbox, i) => {
    checkbox.onchange = function (event) {
      console.log(event.target.labels[0].innerText.trim());
    };
  });
}

function selectTamanhos() {
  const tamanho = document.querySelectorAll(".caixa_tamanhos");
  tamanho.forEach((tamanho, i) => {
    tamanho.onclick = function (event) {
      console.log(event.target.textContent.trim());
    };
  });
}

function btnCarregarMais(){
  const btn = document.querySelector('.btn_carregarMais');
  btn.onclick = function(){
    console.log('btn carregar mais clicked')
  }
}

window.onload = function () {
  btn_sacola()
  btnComprar();
  checkbox();
  selectTamanhos();
  btnCarregarMais()
};

getProducts();
