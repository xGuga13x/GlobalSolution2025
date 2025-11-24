/* ============================================================
   NAVBAR TRANSPARENTE AO ROLAR
============================================================ */
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) header.classList.toggle("scrolled", window.scrollY > 20);
});

/* ============================================================
   ANIMAÇÕES COM INTERSECTION OBSERVER
============================================================ */
const elementosAnimar = document.querySelectorAll(".aparecer");

if (elementosAnimar.length > 0) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) entrada.target.classList.add("visivel");
      });
    },
    { threshold: 0.2 }
  );

  elementosAnimar.forEach((el) => observador.observe(el));
}

/* ============================================================
   MODAL DE LOGIN (se existir na página)
============================================================ */
const botaoLogin = document.querySelector(".login");
const modalLogin = document.getElementById("modal-login");
const fecharLogin = document.querySelector(".fechar-login");

if (botaoLogin && modalLogin) {
  botaoLogin.addEventListener("click", (e) => {
    e.preventDefault();
    modalLogin.style.display = "flex";
  });
}

if (fecharLogin) {
  fecharLogin.addEventListener("click", () => {
    modalLogin.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modalLogin) modalLogin.style.display = "none";
});

/* ============================================================
   DASHBOARD (só carrega se os elementos existirem)
============================================================ */
if (document.getElementById("graficoHumor")) {
  const dias = ["Seg", "Ter", "Qua", "Qui", "Sex"];
  const humor = [3, 4, 2, 5, 4];
  const produtividade = [60, 70, 50, 90, 80];
  const mood = humor.map((h, i) => ((h + produtividade[i]) / 2).toFixed(1));

  const media = (arr) =>
    arr.reduce((a, b) => Number(a) + Number(b), 0) / arr.length;

  document.getElementById("humorMedia").innerText = media(humor).toFixed(1);
  document.getElementById("prodMedia").innerText =
    media(produtividade).toFixed(1);
  document.getElementById("moodScoreMedia").innerText = media(mood).toFixed(1);

  // Gráfico de Humor
  new Chart(document.getElementById("graficoHumor"), {
    type: "line",
    data: {
      labels: dias,
      datasets: [
        {
          label: "Humor",
          data: humor,
          borderColor: "#3c6dff",
          backgroundColor: "rgba(60,109,255,0.25)",
          tension: 0.4,
          borderWidth: 3,
        },
      ],
    },
  });

  // Gráfico de Produtividade
  new Chart(document.getElementById("graficoProd"), {
    type: "line",
    data: {
      labels: dias,
      datasets: [
        {
          label: "Produtividade",
          data: produtividade,
          borderColor: "#2d4ad7",
          backgroundColor: "rgba(45,74,215,0.25)",
          tension: 0.4,
          borderWidth: 3,
        },
      ],
    },
  });

  // Gráfico de Mood Score
  new Chart(document.getElementById("graficoMood"), {
    type: "bar",
    data: {
      labels: dias,
      datasets: [
        {
          label: "Mood Score",
          data: mood,
          backgroundColor: "#6ea8ff",
          borderRadius: 10,
        },
      ],
    },
  });
}

/* ============================================================
   LOGIN (página Login.html)
============================================================ */
const formLogin = document.getElementById("formLogin");

if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email")?.value.trim();
    const senha = document.getElementById("senha")?.value.trim();

    if (email && senha) {
      localStorage.setItem("usuario", email);
      window.location.href = "Home.html";
    }
  });
}

/* ============================================================
   CARROSSEL (página sobre.html)
============================================================ */
const carrossel = document.querySelector(".carrossel");

if (carrossel) {
  const slides = carrossel.querySelectorAll(".slide");
  const botaoAnterior = carrossel.querySelector(".anterior");
  const botaoProximo = carrossel.querySelector(".proximo");
  const indicadoresContainer = carrossel.querySelector(".indicadores");

  let indiceAtual = 0;

  // Criar indicadores dinamicamente
  slides.forEach((_, index) => {
    const indicador = document.createElement("div");
    if (index === 0) indicador.classList.add("ativo");
    indicadoresContainer.appendChild(indicador);
  });

  const indicadores = indicadoresContainer.querySelectorAll("div");

  function atualizarSlides() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("ativo", index === indiceAtual);
      indicadores[index].classList.toggle("ativo", index === indiceAtual);
    });
  }

  botaoProximo?.addEventListener("click", () => {
    indiceAtual = (indiceAtual + 1) % slides.length;
    atualizarSlides();
  });

  botaoAnterior?.addEventListener("click", () => {
    indiceAtual = (indiceAtual - 1 + slides.length) % slides.length;
    atualizarSlides();
  });

  indicadores.forEach((ind, index) =>
    ind.addEventListener("click", () => {
      indiceAtual = index;
      atualizarSlides();
    })
  );

  setInterval(() => {
    indiceAtual = (indiceAtual + 1) % slides.length;
    atualizarSlides();
  }, 7000);
}

/* ============================================================
   FORMULÁRIO DE CONTATO (mensagem.html)
============================================================ */
const formContato = document.getElementById("formContato");

if (formContato) {
  formContato.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const assunto = document.getElementById("assunto")?.value.trim();
    const mensagem = document.getElementById("mensagem")?.value.trim();

    if (nome && email && assunto && mensagem) {
      alert("Mensagem enviada com sucesso! 🎉\nRetornaremos em breve.");
      window.location.href = "faq.html"; // volta ao FAQ
    }
  });
} /* ============================================================
   GRÁFICO DE PIZZA – Tendência de Problemas
============================================================ */
if (document.getElementById("graficoProblemas")) {
  const labelsProblemas = [
    "Estresse",
    "Carga de Trabalho",
    "Comunicação",
    "Reconhecimento",
    "Clima com Liderança",
  ];

  const dadosProblemas = [40, 25, 15, 10, 10]; // MODIFIQUE AQUI OS VALORES

  new Chart(document.getElementById("graficoProblemas"), {
    type: "pie",
    data: {
      labels: labelsProblemas,
      datasets: [
        {
          data: dadosProblemas,
          backgroundColor: [
            "#4a90e2",
            "#50e3c2",
            "#f5a623",
            "#e94e77",
            "#7b8d93",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Tendência de Problemas",
        },
      },
    },
  });
}
