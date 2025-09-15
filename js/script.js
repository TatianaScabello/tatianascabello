/* File: site-tatiana/js/script.js
   Descrição:
   - Comportamentos interativos: typed-text, reveal on scroll, header scrolled, menu mobile,
     parallax hero, construção de mensagem WhatsApp conforme regra (Nome preenchido / vazio),
     atualização do ano no rodapé e pequenos aprimoramentos UX.
   Como editar rapidamente:
   - Alterar o número padrão de WhatsApp: veja a constante `DEFAULT_WHATSAPP`.
   - Alterar templates de mensagem: veja `MSG_WITH_NAME` e `MSG_NO_NAME`.
   - Se preferir, coloque seu número diretamente no atributo data-whatsapp do botão no HTML.
*/

/* ======================
   CONFIGURAÇÕES (edite aqui)
   ====================== */
// Número padrão internacional (caso não esteja preenchido no HTML). Formato: somente dígitos (ex: "5511999999999")
const DEFAULT_WHATSAPP = "5511994504082";

// Mensagens (padrões) -> edite se desejar outro texto
const MSG_WITH_NAME = nome => `Olá, meu nome é ${nome}. Gostaria de marcar uma consulta.`;
const MSG_NO_NAME = () => `Olá, gostaria de marcar uma consulta.`;

/* ======================
   FUNÇÕES AUXILIARES
   ====================== */

/**
 * Retorna o número de WhatsApp a ser usado para um botão (procura data-whatsapp no elemento;
 * se não existir, retorna DEFAULT_WHATSAPP).
 * @param {HTMLElement} el
 * @returns {string} número sem sinais (ex: "5511999999999")
 */
function getWhatsAppNumberFrom(el) {
  if (!el) return DEFAULT_WHATSAPP;
  const raw = el.dataset?.whatsapp?.trim();
  if (!raw || raw.length === 0) return DEFAULT_WHATSAPP;
  // Remove tudo que não é dígito (mantém código do país)
  return raw.replace(/\D/g, "");
}

/**
 * Abre WhatsApp (web/wa.me) com a mensagem dada (abre em nova aba).
 * Monta URL: https://wa.me/<numero>?text=<mensagem codificada>
 * @param {string} numero - só dígitos (ex: "5511999999999")
 * @param {string} mensagem
 */
function openWhatsApp(numero, mensagem) {
  const base = `https://wa.me/${numero}`;
  const url = `${base}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank", "noopener");
}

/* ======================
   TYPED / EFEITO DE TEXTO
   ====================== */
/**
 * Efeito typed simples: leitura de strings do data-attribute (JSON array)
 * Espera elemento com id="typed-text" presente no HTML.
 */
function initTypedEffect() {
  const el = document.getElementById("typed-text");
  if (!el) return;

  // data-strings deve ser um JSON array no HTML (index.html já define)
  let strings = [];
  try {
    strings = JSON.parse(el.dataset.strings);
    if (!Array.isArray(strings) || strings.length === 0) throw new Error("empty");
  } catch (err) {
    // fallback simples (edite aqui se quiser outras frases padrão)
    strings = [
      "Psiquiatria clínica e consultiva",
      "Medicina Endocanabinóide aplicada",
      "Psicoterapia de orientação psicanalítica"
    ];
  }

  let current = 0;
  let pos = 0;
  let deleting = false;
  const speedType = 40;      // ms por caractere
  const speedDelete = 28;    // ms por caractere deletado
  const delayBetween = 1200; // pausa entre frases

  function tick() {
    const full = strings[current];
    if (!deleting) {
      pos++;
      el.textContent = full.slice(0, pos);
      if (pos === full.length) {
        deleting = true;
        setTimeout(tick, delayBetween);
        return;
      }
      setTimeout(tick, speedType + Math.random() * 40);
    } else {
      pos--;
      el.textContent = full.slice(0, pos);
      if (pos === 0) {
        deleting = false;
        current = (current + 1) % strings.length;
        setTimeout(tick, 250);
        return;
      }
      setTimeout(tick, speedDelete);
    }
  }

  // Inicia
  tick();
}

/* ======================
   SCROLL REVEAL (IntersectionObserver)
   ====================== */
/**
 * Adiciona a classe 'reveal' a elementos que queremos animar (fallback CSS),
 * e observa para adicionar a classe 'visible' quando aparecem na viewport.
 */
function initScrollReveal() {
  // Seleciona seções e cards que devem revelar
  const targets = document.querySelectorAll(
    "#sobre .about-text, #sobre .about-aside, .area-card, .service-block, .pricing-card, .contact-form, .contact-info .contact-card, .hero-copy"
  );

  // Marca como reveal (para aplicar estilo inicial via CSS)
  targets.forEach(el => el.classList.add("reveal"));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Se não quiser re-animar, desobserve
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  targets.forEach(el => obs.observe(el));
}

/* ======================
   HEADER (classe 'scrolled' ao rolar)
   ====================== */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // avaliar no carregamento
}

/* ======================
   HERO PARALLAX (sutil)
   ====================== */
function initHeroParallax() {
  const hero = document.querySelector(".hero.section--parallax");
  if (!hero) return;

  function onScroll() {
    // Ajuste o deslocamento conforme desejar (menor = subtile)
    const offset = window.scrollY * 0.2;
    hero.style.backgroundPosition = `center calc(50% + ${offset}px)`;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ======================
   NAV MOBILE (toggle)
   ====================== */
function initMobileNav() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    // controle visual simples: altera display
    if (isOpen) {
      nav.style.display = "flex";
      // animação suave
      nav.style.opacity = "0";
      requestAnimationFrame(() => nav.style.opacity = "1");
    } else {
      nav.style.opacity = "0";
      setTimeout(() => { nav.style.display = ""; nav.style.opacity = ""; }, 220);
    }
  });

  // Fechar menu ao clicar em link (mobile)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      if (window.innerWidth <= 1024) {
        nav.classList.remove("open");
        nav.style.opacity = "0";
        setTimeout(() => { nav.style.display = ""; nav.style.opacity = ""; }, 220);
      }
    });
  });
}

/* ======================
   SMOOTH SCROLL PARA LINKS INTERNOS
   ====================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", function (ev) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      ev.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ======================
   FORMULÁRIO E WHATSAPP LOGIC
   ====================== */
function initWhatsAppButtons() {
  // Botões que abrem WhatsApp (hero e na seção de contato) - ambos possuem data-whatsapp
  const heroBtn = document.getElementById("btn-agendar");
  const contactBtn = document.getElementById("btn-whatsapp");
  const nomeInput = document.getElementById("nome");
  const whatsappDisplay = document.getElementById("whatsapp-display");

  // Atualiza o número exibido no contato com o valor do botão (se desejado)
  const fallbackNumber = DEFAULT_WHATSAPP;
  const btnNumber = heroBtn ? getWhatsAppNumberFrom(heroBtn) : fallbackNumber;
  if (whatsappDisplay) {
    // Formata para exibição (padrão simples, você pode alterar)
    const formatted = formatBRPhone(btnNumber);
    whatsappDisplay.textContent = formatted;
  }

  function buildMessage() {
    const nome = (nomeInput && nomeInput.value && nomeInput.value.trim()) || "";
    return nome ? MSG_WITH_NAME(nome) : MSG_NO_NAME();
  }

  // Handler comum
  function handleClick(evt, sourceBtn) {
    const numero = getWhatsAppNumberFrom(sourceBtn) || DEFAULT_WHATSAPP;
    const mensagem = buildMessage();
    openWhatsApp(numero, mensagem);
  }

  if (heroBtn) {
    heroBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleClick(e, heroBtn);
    });
  }

  if (contactBtn) {
    contactBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleClick(e, contactBtn);
    });
  }

  // Também intercepta o envio do formulário (botão "Enviar por E-mail (opcional)")
  const form = document.getElementById("form-contato");
  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      // Nesta versão demo não há backend para envio de e-mail.
      // Você pode integrar aqui com um serviço (ex: EmailJS, Netlify Forms, Formspree) ou implementar backend.
      alert("Funcionalidade de envio por e-mail não configurada. Use 'Enviar via WhatsApp' para contato rápido.");
    });
  }
}

/**
 * Formata número BR simples -> +55 (11) 99999-9999
 * Aceita string somente dígitos (ex: "5511999999999")
 */
function formatBRPhone(digits) {
  if (!digits) return digits || "";
  // Remove prefixo internacional se já tiver +, etc.
  const raw = digits.replace(/\D/g, "");
  // exemplo: 5511999999999
  // tenta separar DDI (2), DDD (2), resto
  const ddi = raw.length > 10 ? raw.slice(0, raw.length - 10) : "";
  const ddd = raw.slice(raw.length - 10, raw.length - 8);
  const rest = raw.slice(-8);
  if (!ddi) {
    // apenas local
    if (!ddd) return raw;
    if (rest.length === 8) {
      return `(${ddd}) ${rest.slice(0,4)}-${rest.slice(4)}`;
    } else if (rest.length === 9) {
      return `+${raw}`; // fallback incomum
    }
  }
  // Formato comum com DDI
  if (rest.length >= 8) {
    const pre = rest.length === 8 ? rest.slice(0,4) : rest.slice(0,5);
    const post = rest.length === 8 ? rest.slice(4) : rest.slice(pre.length);
    return `+${ddi} (${ddd}) ${pre}-${post}`;
  }
  return `+${raw}`;
}

/* ======================
   UTIL: atualiza ano no rodapé
   ====================== */
function initFooterYear() {
  const el = document.getElementById("current-year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ======================
   INIT MAIN
   ====================== */
document.addEventListener("DOMContentLoaded", () => {
  initTypedEffect();
  initScrollReveal();
  initHeaderScroll();
  initHeroParallax();
  initMobileNav();
  initSmoothScroll();
  initWhatsAppButtons();
  initFooterYear();

  // Pequeno ajuste: permitir expandir cards de área no toque (mobile)
  document.querySelectorAll(".area-card").forEach(card => {
    card.addEventListener("click", () => {
      // Toggle exibição do texto longo em mobile (a CSS exibe em hover no desktop)
      const longText = card.querySelector(".long-text");
      if (!longText) return;
      const isVisible = longText.style.display === "block";
      longText.style.display = isVisible ? "none" : "block";
      // Animation hint
      card.style.transform = isVisible ? "" : "translateY(-6px) scale(1.01)";
      setTimeout(() => card.style.transform = "", 420);
    });
  });

  // Accessibility: allow keyboard toggle for nav button
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("keyup", (e) => {
      if (e.key === "Enter" || e.key === " ") navToggle.click();
    });
  }
});
