// Aguarda o navegador carregar o HTML e as funções escritas pela equipe no EJS
document.addEventListener("DOMContentLoaded", () => {
    // Dispara automaticamente a função visual da equipe
    if (typeof listarUsuarios === 'function') {
        listarUsuarios();
    }
});