/* =========================
   HEADER SCROLL EFFECT
   ========================= */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

/* =========================
   MENU MOBILE
   ========================= */
const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

/* =========================
   WHATSAPP FORM
   ========================= */
const form = document.getElementById('form-contato');
const nomeInput = document.getElementById('nome');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  let nome = nomeInput.value.trim();
  let mensagem = '';

  if (nome.length > 0) {
    mensagem = `Olá, meu nome é ${nome}. Gostaria de marcar uma consulta.`;
  } else {
    mensagem = 'Olá, gostaria de marcar uma consulta.';
  }

  const url = `https://wa.me/5511994504082?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
});

/* =========================
   ANIMAÇÕES DE SCROLL
   ========================= */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('section, .card, .blog-card').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});
