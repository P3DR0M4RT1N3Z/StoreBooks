// Script principal para site de e-commerce de livros com design minimalista e tons pastéis

document.addEventListener("DOMContentLoaded", () => {
    // --- MENU LATERAL (Hambúrguer) ---
    const menuToggle = document.querySelector(".menu-toggle");
    const menuClose = document.querySelector(".menu-close");
    const menu = document.querySelector(".menu");

    // Abre/fecha o menu lateral
    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
    menuClose.addEventListener("click", () => {
        menu.classList.remove("active");
    });

    // --- CARRINHO ---
    const carrinhoToggle = document.querySelector(".carrinho-toggle");
    const carrinhoMenu = document.querySelector(".carrinho-menu");
    const carrinhoClose = document.querySelector(".carrinho-close");
    const carrinhoItens = document.querySelector(".carrinho-itens");
    const carrinhoTotal = document.querySelector(".carrinho-total");
    const carrinhoNotificacao = document.getElementById("carrinhoNotificacao");
    const adicionarCarrinhoBotoes = document.querySelectorAll(".adicionar-carrinho");

    let total = 0;

    // Abre/fecha o carrinho lateral
    carrinhoToggle.addEventListener("click", () => {
        carrinhoMenu.classList.toggle("active");
    });
    carrinhoClose.addEventListener("click", () => {
        carrinhoMenu.classList.remove("active");
    });

    // Mostra notificação de produto adicionado
    function mostrarNotificacao() {
        carrinhoNotificacao.textContent = "Produto adicionado ao carrinho ✅";
        carrinhoNotificacao.classList.add("mostrar");
        setTimeout(() => {
            carrinhoNotificacao.classList.remove("mostrar");
        }, 2000);
    }

    // Adiciona produto ao carrinho
    adicionarCarrinhoBotoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const nome = botao.getAttribute("data-nome");
            const preco = parseFloat(botao.getAttribute("data-preco"));

            // Cria item do carrinho
            const item = document.createElement("li");
            item.innerHTML = `
                <span>${nome}</span>
                <span>R$ ${preco.toFixed(2)}</span>
                <button class="remover-item">Remover</button>
            `;
            carrinhoItens.appendChild(item);

            // Atualiza total
            total += preco;
            carrinhoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;

            // Remove item do carrinho
            item.querySelector(".remover-item").addEventListener("click", () => {
                carrinhoItens.removeChild(item);
                total -= preco;
                carrinhoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
            });

            mostrarNotificacao();
        });
    });

    // --- CARROSSEL DE BANNERS ---
    const imagens = document.querySelectorAll(".carrossel-item");
    const prevButton = document.querySelector(".carrossel-prev");
    const nextButton = document.querySelector(".carrossel-next");
    let indexAtual = 0;

    // Exibe imagem do carrossel conforme o índice
    function mostrarImagem(index) {
        imagens.forEach((img, i) => {
            img.classList.toggle("ativo", i === index);
        });
    }

    prevButton.addEventListener("click", () => {
        indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
        mostrarImagem(indexAtual);
    });
    nextButton.addEventListener("click", () => {
        indexAtual = (indexAtual + 1) % imagens.length;
        mostrarImagem(indexAtual);
    });

    mostrarImagem(indexAtual); // Mostra a primeira imagem ao carregar

    // --- POPUP DE PROMOÇÃO ---
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");
    const timerElement = document.getElementById("timer");

    // Exibe o popup após 2 segundos
    setTimeout(() => {
        popup.classList.add("show");
    }, 2000);

    // Fecha o popup ao clicar em "Fechar"
    closePopup.addEventListener("click", () => {
        popup.classList.remove("show");
    });

    // Temporizador de 20 minutos para o popup
    let tempoRestante = 20 * 60; // 20 minutos em segundos
    function atualizarTimer() {
        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;
        timerElement.textContent = `Tempo restante: ${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
        tempoRestante--;
        if (tempoRestante < 0) {
            clearInterval(intervalo);
            popup.classList.remove("show");
        }
    }
    const intervalo = setInterval(atualizarTimer, 1000);

    // Filtro de gêneros literários
    const filtroBotoes = document.querySelectorAll('.filtro-btn');
    const produtos = document.querySelectorAll('.produto');

    filtroBotoes.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove classe ativo de todos e adiciona ao clicado
            filtroBotoes.forEach(b => b.classList.remove('ativo'));
            btn.classList.add('ativo');

            const genero = btn.getAttribute('data-genero');
            produtos.forEach(produto => {
                if (genero === 'todos' || produto.getAttribute('data-genero') === genero) {
                    produto.style.display = '';
                } else {
                    produto.style.display = 'none';
                }
            });
        });
    });

    document.querySelectorAll('.menu-genero').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const genero = this.getAttribute('data-genero');
            // Ativa o filtro correspondente
            const filtroBtn = document.querySelector(`.filtro-btn[data-genero="${genero}"]`);
            if (filtroBtn) filtroBtn.click();
            // Fecha o menu lateral
            document.querySelector('.menu').classList.remove('active');
        });
    });
});