/* =====================================
   script.js - Funcionalidade do site
   =====================================
   ⚠️ INSTRUÇÕES:
   - Substitua o número abaixo pelo seu WhatsApp no formato internacional.
     Exemplo para Brasil: 55 + DDD + número.
     São Paulo/SP → "5511999999999"
   - Ao enviar o formulário, o link abre em nova aba.
===================================== */

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contact-form");

  // ⚠️ ALTERE AQUI O NÚMERO DO WHATSAPP
  const telefoneWhatsApp = "5511999999999";

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();

    let mensagem = "";
    if (nome) {
      mensagem = `Olá, meu nome é ${nome}. Gostaria de marcar uma consulta.`;
    } else {
      mensagem = "Olá, gostaria de marcar uma consulta.";
    }

    const url = `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  });
});
