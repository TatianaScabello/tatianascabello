/* script.js
   Funcionalidades do site da Dra. Tatiana Scabello Constantino
*/

// ===== CONFIGURAÇÕES =====
// Substitua pelo número de WhatsApp oficial (no formato internacional: 55 + DDD + número)
const whatsappNumber = "5511994504082"; // exemplo: 55 (Brasil) + 11 (DDD SP) + número

// ===== BOTÃO WHATSAPP =====
const whatsappBtn = document.getElementById("whatsappBtn");
if (whatsappBtn) {
  whatsappBtn.addEventListener("click", () => {
    const nome = document.getElementById("nome").value.trim();
    let mensagem = "";

    if (nome) {
      mensagem = `Olá, meu nome é ${nome}. Gostaria de marcar uma consulta.`;
    } else {
      mensagem = "Olá, gostaria de marcar uma consulta.";
    }

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  });
}

// ===== CABEÇALHO FIXO (rolagem) =====
const header = document.getElementById("site-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ===== MENU MOBILE =====
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// ===== ATUALIZAÇÃO DO ANO NO RODAPÉ =====
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===== ANIMAÇÃO FADE-IN AO ROLAR =====
const animatedElements = document.querySelectorAll(
  ".section, .card, .service, .contact-form, .contact-info"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeIn 1.2s ease forwards";
        observer.unobserve(entry.target); // evita reaplicar sempre
      }
    });
  },
  { threshold: 0.2 }
);

animatedElements.forEach((el) => {
  el.style.opacity = 0;
  observer.observe(el);
});

