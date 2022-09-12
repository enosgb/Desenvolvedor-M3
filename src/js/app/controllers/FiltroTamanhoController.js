export class FiltroTamanhoController {
  constructor() {}

  filtraPorTamanho(listaFiltros, produtosView, btnTamanhos, btnCarregarmais) {
    let todosTamanhos = listaFiltros;
    function atualizaViewPorTanho(
      btn,
      listaTamanhos,
      produtosView,
      btnCarregarmais
    ) {
      if (listaTamanhos.length > 0) {
        let ativo = document.querySelectorAll(".tamanho_active");
        ativo.forEach((value, i) => {
          value.classList.remove("tamanho_active");
        });
        btn.add("tamanho_active");
        produtosView.update(listaTamanhos);
        btnCarregarmais.hidden = true;
      } else {
        produtosView.update([]);

        btnCarregarmais.hidden = true;
      }
    }

    function verificaTamanho(
      btn,
      produtosView,
      todosTamanhos,
      btnCarregarmais,
      listaFiltros,
      event
    ) {
      if (!btn.contains("tamanhos")) {
        if (btn.length > 1) {
          produtosView.update(todosTamanhos.slice(0, 9));
          btn.remove("tamanho_active");
          if (todosTamanhos.length >= 9) btnCarregarmais.hidden = false;
        } else {
          btn.add("tamanho_active");
          let tamanho = event.target.textContent;

          let listaTamanhos = listaFiltros.filter((p) =>
            p.size.includes(tamanho)
          );
          atualizaViewPorTanho(
            btn,
            listaTamanhos,
            produtosView,
            btnCarregarmais
          );
        }
      }
    }

    function realizaFiltros() {
      btnTamanhos.addEventListener("click", function (event) {
        event.preventDefault();
        let btn = event.target.classList;
        verificaTamanho(
          btn,
          produtosView,
          todosTamanhos,
          btnCarregarmais,
          listaFiltros,
          event
        );
      });
    }

    realizaFiltros();
  }
}
