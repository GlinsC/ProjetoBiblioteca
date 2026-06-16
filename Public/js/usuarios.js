async function carregarUsuarios() {
    // 1. Vai ao cofre do navegador buscar o token exato que o login.ejs guardou
    const token = localStorage.getItem("biblioteca_token");

    // 2. Barreira de segurança do Front-end: se não tem token, expulsa para o login
    if (!token) {
        window.location.href = "/login";
        return;
    }

    try {
        // 3. Faz a requisição enviando o "crachá" JWT para passar no auth.js do Back-end
        const resposta = await fetch("/api/usuarios", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        // 4. Trata a resposta do servidor
        if (resposta.ok) {
            const usuarios = await resposta.json();
            console.log("Usuários carregados com sucesso:", usuarios);
            
            // O próximo passo será criar a função para desenhar estes dados no HTML
            // renderizarTabela(usuarios); 
            
        } else if (resposta.status === 401 || resposta.status === 403) {
            // Se o token expirou ou é inválido, limpa o cofre e manda fazer login de novo
            console.error("Acesso negado. Redirecionando...");
            localStorage.removeItem("biblioteca_token");
            window.location.href = "/login";
        } else {
            console.error("Falha ao buscar usuários no servidor.");
        }
    } catch (erro) {
        console.error("Erro crítico de conexão:", erro);
    }
}

// Executa a função assim que a página carrega
carregarUsuarios();