/* =====================================================
   HEADER DINÂMICO — muda aparência ao rolar
===================================================== */
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.style.background = "rgba(28,58,77,0.95)";
    header.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
  } else {
    header.style.background = "rgba(28,58,77,0.85)";
    header.style.boxShadow = "none";
  }
});

/* =====================================================
   ANIMAÇÃO DE SCROLL — fade-in suave
===================================================== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".section, .blog-card").forEach(el => observer.observe(el));

/* =====================================================
   NAVEGAÇÃO INTERNA DO BLOG
   - Esconde seções
   - Exibe apenas o post selecionado
===================================================== */
const blogLinks = document.querySelectorAll(".blog-card a");
const posts = document.querySelectorAll(".post-page");
const sections = document.querySelectorAll("main > section");

blogLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = link.getAttribute("href");

    sections.forEach(sec => sec.style.display = "none");
    document.querySelector(id).style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/* =====================================================
   BOTÃO WHATSAPP — mensagem automática
   Edite aqui se mudar o número futuramente
===================================================== */
document.getElementById("whatsapp-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  let mensagem = "Olá, gostaria de marcar uma consulta.";

  if (nome !== "") {
    mensagem = `Olá, meu nome é ${nome}. Gostaria de marcar uma consulta.`;
  }

  const url = `https://wa.me/5511994504082?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
});
