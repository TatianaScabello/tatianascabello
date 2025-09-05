// ======================================================================
// script.js — Comportamentos do site
// ======================================================================

// -------------------- Menu Mobile --------------------
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".main-nav .nav-list");

  if (toggleBtn && navList) {
    toggleBtn.addEventListener("click", () => {
      navList.classList.toggle("open");
    });
  }
});

// -------------------- Ano automático no footer --------------------
const anoSpan = document.getElementById("ano");
if (anoSpan) {
  anoSpan.textContent = new Date().getFullYear();
}

// -------------------- WhatsApp dinâmico --------------------
const whatsappBtn = document.querySelector(".btn-whatsapp");

if (whatsappBtn) {
  whatsappBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Número da clínica (substituir pelo oficial)
    const telefone = "5511999999999";

    // Verifica se o nome foi preenchido no formulário
    const nomeInput = document.getElementById("nome");
    let mensagem = "Olá, gostaria de marcar uma consulta.";

    if (nomeInput && nomeInput.value.trim() !== "") {
      mensagem = `Olá, meu nome é ${nomeInput.value.trim()} e gostaria de marcar uma consulta.`;
    }

    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  });
}
