document.addEventListener("DOMContentLoaded", function() {
    // Limpa dados antigos
    localStorage.removeItem("ultimoContato");
    sessionStorage.clear(); // se quiser limpar sessões antigas
    // ============================
    // MENU HAMBÚRGUER
    // ============================
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    if (hamburger && menu) {
        hamburger.addEventListener("click", function() {
            menu.classList.toggle("show");
            hamburger.classList.toggle("active");
        });
    }

    // ============================
    // FORMULÁRIO DE CONTATO
    // ============================
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", function(event) {

            if (!form.checkValidity()) {
                return;
            }

            event.preventDefault();

            // Captura dos dados
            let dados = {
                nome: document.getElementById("txtNome").value,
                email: document.getElementById("txtEmail").value,
                telefone: document.getElementById("telefone").value,
                assunto: document.getElementById("txtAssunto").value,
                mensagem: document.getElementById("txtMensagem").value,
                dataEnvio: new Date().toLocaleString()
            };

            // Salva privado (não aparece na página)
            localStorage.setItem("ultimoContato", JSON.stringify(dados));
            sessionStorage.setItem("mensagemTemporaria", dados.mensagem);

            alert("Mensagem enviada com sucesso!");

            form.reset();
        });
    }

});
