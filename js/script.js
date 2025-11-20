// ============================
// SCRIPT ÚNICO DO PROJETO
// ============================

document.addEventListener("DOMContentLoaded", () => {

    // ============================================================
    // 1. LIMPEZA DE DADOS ANTIGOS (APENAS DO PROJETO ANTERIOR)
    // ============================================================
    localStorage.removeItem("ultimoContato");
    sessionStorage.clear();


    // ============================================================
    // 2. MENU HAMBÚRGUER + OVERLAY
    // ============================================================
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    if (hamburger && menu) {

        // cria overlay dinamicamente para manter HTML limpo
        let overlay = document.querySelector(".menu-overlay");

        if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = "menu-overlay";
            document.body.appendChild(overlay);
        }

        // abre/fecha menu
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            menu.classList.toggle("show");
            overlay.classList.toggle("show");

            hamburger.setAttribute(
                "aria-expanded",
                hamburger.classList.contains("active")
            );
        });

        // fecha clicando fora
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                hamburger.classList.remove("active");
                menu.classList.remove("show");
                overlay.classList.remove("show");

                hamburger.setAttribute("aria-expanded", "false");
            }
        });
    }


    // ============================================================
    // 3. FORMULÁRIO DE CONTATO (SIMULAÇÃO — NÃO SALVA NADA)
    // ============================================================
    const form = document.getElementById("formContato");

    if (form) {
        const status = document.createElement("p");
        status.id = "msgStatus";
        status.style.marginTop = "10px";
        form.appendChild(status);

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = form.txtNome.value.trim();
            const email = form.txtEmail.value.trim();
            const mensagem = form.txtMensagem.value.trim();

            if (!nome || !email || !mensagem) {
                status.textContent = "Preencha todos os campos obrigatórios.";
                status.style.color = "red";
                return;
            }

            // Nenhum dado é armazenado.
            status.textContent = "Mensagem enviada! (simulação — nada foi salvo)";
            status.style.color = "#0a7a4a";

            form.reset();
        });
    }

});
