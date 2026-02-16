/* ================================
   MENU MOBILE
================================ */
const menuBtn = document.querySelector('.menu-mobile');
const nav = document.querySelector('.nav');

if(menuBtn){
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
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

/* ================= ACCORDION FUNCIONA ================= */

const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach(item => {

   const accordionHeader = item.querySelector(".accordion-header");
   
   if(!header) return;
   
   accordionHeader.addEventListener("click", () => {

    const isActive = item.classList.contains("active");

    accordionItems.forEach(i => i.classList.remove("active"));

    if (!isActive) {
      item.classList.add("active");
    }

    updateAccordionState();

  });

});

function updateAccordionState() {

  const hasActive = document.querySelector(".accordion-item.active");

  document.querySelector(".funciona-accordion")
    .classList.toggle("has-active", !!hasActive);
}

updateAccordionState();



