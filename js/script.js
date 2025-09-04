/* js/script.js
   ----------------
   - Controla menu mobile (abre/fecha em telas pequenas).
   - Controla botão de WhatsApp: gera mensagem com ou sem nome.
   - Substitua o número de telefone no campo hidden #wa-phone no HTML.
*/

document.addEventListener("DOMContentLoaded", () => {
  /* ===== MENU MOBILE ===== */
  const toggleBtn = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", String(!isOpen));
      mobileMenu.hidden = isOpen;
    });
  }

  /* ===== WHATSAPP FORM ===== */
  const waBtn = document.getElementById("wa-button");
  const nomeInput = document.getElementById("nome");
  const phoneInput = document.getElementById("wa-phone");

  if (waBtn && nomeInput && phoneInput) {
    waBtn.addEventListener("click", () => {
      const nome = nomeInput.value.trim();
      const phone = phoneInput.value.trim();

      // Mensagens conforme regras
      let mensagem = "";
      if (nome) {
        mensagem = `Olá, meu nome é ${nome}. Gostaria de marcar uma consulta.`;
      } else {
        mensagem = "Olá, gostaria de marcar uma consulta.";
      }

      // Monta link do WhatsApp (API oficial)
      // phone deve estar no formato internacional sem +, espaços ou traços. Ex: 5511994504082
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(mensagem)}`;

      // Redireciona o usuário
      window.open(url, "_blank");
    });
  }

  /* ===== ANO AUTOMÁTICO NO FOOTER ===== */
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
