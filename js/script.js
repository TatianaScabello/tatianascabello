/* ================================
   MENU MOBILE
================================ */
const menuBtn = document.querySelector('.menu-mobile');
const nav = document.querySelector('.nav');

if(menuBtn && nav){
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    menuBtn.setAttribute('aria-expanded', nav.classList.contains('nav-open'));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ================================
   HEADER COM TRANSIÇÃO AO SCROLL
================================ */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.background = 'rgba(195,218,195,0.95)';
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
  } else {
    header.style.background = 'rgba(195,218,195,0.9)';
    header.style.boxShadow = 'none';
  }
});

/* ================================
   BOTÃO WHATSAPP COM NOME DINÂMICO
   Edite apenas o número se necessário
================================ */
const btnWhatsapp = document.getElementById('btn-whatsapp');
const inputNome = document.getElementById('nome');

if (btnWhatsapp && inputNome) {
  btnWhatsapp.addEventListener('click', () => {
    const nome = inputNome.value.trim();
    let mensagem = '';

    if (nome !== '') {
      mensagem = `Olá, meu nome é ${nome}. Gostaria de marcar uma consulta.`;
    } else {
      mensagem = 'Olá, gostaria de marcar uma consulta.';
    }

    const telefone = '5511994504082';
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  });
}

/* ================= ACCORDION FUNCIONA ================= */

document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const accordion = document.querySelector(".funciona-accordion");

    const isActive = item.classList.contains("active");

    // Fecha todos
    document.querySelectorAll(".accordion-item").forEach(i => {
      i.classList.remove("active");
    });

    if (!isActive) {
      item.classList.add("active");
    }

    // adiciona classe auxiliar para efeito zoom
    const anyActive = document.querySelector(".accordion-item.active");
    if (anyActive) {
      accordion.classList.add("has-active");
    } else {
      accordion.classList.remove("has-active");
    }
  });
});




const floatingScheduleBtn = document.querySelector('.btn-flutuante-mobile');
const scheduleButtons = Array.from(document.querySelectorAll('a.btn-primary, .btn-footer'))
  .filter((button) => button.textContent.toLowerCase().includes('agendar consulta'));

function isFullyVisibleInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

function toggleFloatingScheduleButton() {
  if (!floatingScheduleBtn) return;

  const shouldHide = scheduleButtons.some(isFullyVisibleInViewport);
  floatingScheduleBtn.classList.toggle('hidden', shouldHide);
}

if (floatingScheduleBtn) {
  window.addEventListener('scroll', toggleFloatingScheduleButton, { passive: true });
  window.addEventListener('resize', toggleFloatingScheduleButton);
  toggleFloatingScheduleButton();
}
