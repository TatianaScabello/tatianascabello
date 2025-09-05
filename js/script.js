// js/script.js
// -----------------------------------------------------
// - Substitua o número do WhatsApp no HTML (data-whatsapp do form).
//   Exemplo no index.html: <form id="contactForm" data-whatsapp="+5511999999999">
// - Este arquivo cuida do redirecionamento ao WhatsApp e do menu mobile.
// - Não há envio de dados a servidores — somente redirecionamento ao WhatsApp.
// -----------------------------------------------------

(function () {
  'use strict';

  // --------- Util: formata o número para o formato aceito pelo wa.me ----------
  // wa.me espera apenas dígitos (código do país + DDD + número) sem sinal '+'.
  function normalizePhone(raw) {
    if (!raw) return '';
    // remove tudo que não for dígito
    const digits = raw.replace(/\D/g, '');
    return digits;
  }

  // --------- Util: monta a mensagem conforme regras ----------
  // Se name tiver conteúdo -> "Olá, meu nome é [NOME]. Gostaria de marcar uma consulta."
  // Se name vazio -> "Olá, gostaria de marcar uma consulta."
  function buildMessage(name) {
    if (name && name.trim().length > 0) {
      return `Olá, meu nome é ${name.trim()}. Gostaria de marcar uma consulta.`;
    } else {
      return 'Olá, gostaria de marcar uma consulta.';
    }
  }

  // --------- Ação: abre WhatsApp (web/mobile) ----------
  function openWhatsApp(phoneRaw, text) {
    const phone = normalizePhone(phoneRaw);
    if (!phone) {
      console.warn('WhatsApp: número não informado. Defina data-whatsapp no formulário com o número internacional (ex. +5511999999999).');
      alert('Número de WhatsApp não configurado. Edite o atributo data-whatsapp no formulário.');
      return;
    }

    // monta url de redirecionamento (wa.me)
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${phone}?text=${encoded}`;

    // abre em nova aba
    window.open(url, '_blank', 'noopener');
  }

  // --------- Inicializa o formulário de contato ----------
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) {
      return;
    }

    // lê número do atributo data-whatsapp (ver index.html)
    let phone = form.getAttribute('data-whatsapp') || '';

    // Se desejar sobrescrever o número aqui diretamente, descomente e ajuste:
    // phone = '+5511999999999'; // substituir por seu número se preferir definir no JS

    // intercepta o submit
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      const nameInput = form.querySelector('#name');
      const nameVal = nameInput ? nameInput.value : '';

      const message = buildMessage(nameVal);

      openWhatsApp(phone, message);

      // opcional: feedback simples ao usuário (não obrigatório)
      // você pode substituir por um toast ou modal se quiser.
      try {
        // pequeno efeito visual: desabilita botão por 800ms para evitar cliques repetidos
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.disabled = true;
          setTimeout(() => (btn.disabled = false), 800);
        }
      } catch (e) {
        /* ignore */
      }
    });
  }

  // --------- Inicializa menu mobile (toggle) ----------
  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.site-nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      // atualiza atributo para acessibilidade
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Fecha o menu ao pressionar ESC
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' || ev.key === 'Esc') {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Fecha o menu quando o usuário clica fora (mobile)
    document.addEventListener('click', function (ev) {
      const target = ev.target;
      if (!nav.contains(target) && !toggle.contains(target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --------- Inicia tudo quando o DOM estiver pronto ----------
  document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
    initMobileMenu();
    // caso queira, aqui você pode inicializar outras funções JS
  });
})();
