/* 
====================================================
ARQUIVO: script.js
Aqui ficam as interações do site:
- Menu mobile
- Header com efeito ao rolar
- Botão WhatsApp dinâmico
====================================================
*/

/* MENU MOBILE */
const menuMobile = document.getElementById("menu-mobile");
const nav = document.getElementById("nav");

menuMobile.addEventListener("click", () => {
  nav.classList.toggle("open");
});

/* HEADER COM SOMBRA AO ROLAR */
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
  } else {
    header.style.boxShadow = "none";
  }
});

/* BOTÃO WHATSAPP COM LÓGICA DE MENSAGEM */
const btnWhatsapp = document.getElementById("btn-whatsapp");
const campoNome = document.getElementById("nome");

btnWhatsapp.addEventListener("click", () => {
  const nome = campoNome.value.trim();

  let mensagem = "Olá, gostaria de marcar uma consulta.";

  if (nome !== "") {
    mensagem = `Olá, meu nome é ${nome}. Gostaria de marcar uma consulta.`;
  }

  // IMPORTANTE:
  // Altere o número se precisar (formato: 5511994504082)
  const numero = "5511994504082";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
});

/* ANIMAÇÃO SUAVE AO ENTRAR NA TELA */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".section, .blog-card").forEach(el => {
  observer.observe(el);
});
