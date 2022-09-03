const elemento = document.getElementById("produtos");

fetch("http://localhost:5000/products")
  .then((response) => response.json())
  .then((data) => {
    data.slice(0,9).forEach((item, i) => {
      const template = `
        <div class="produto">
            <img src="${item.image}" />
            <h3 class="produto_title">${item.name}</h3>
            <h3 class="produto_preco">R$ ${item.price.toFixed(2)}</h3>
            <h3 class="produto_parcelamento">até ${item.parcelamento[0]}x de R$${item.parcelamento[1].toFixed(2)}</h3>
            <button class="btn_comprar">Comprar</button>
        </div>`;
      elemento.innerHTML += template;
    });
    elemento.innerHTML += ``
  });
