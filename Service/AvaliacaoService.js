class AvaliacaoService {

    constructor(avaliacaoRepository, usuarioRepository, livroRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
        this.usuarioRepository = usuarioRepository;
        this.livroRepository = livroRepository;

    }

    async criar(dados) {


        if (!dados.descricao) {
            throw new Error("Descrição obrigatória");
        }

        if (dados.nota === undefined) {
            throw new Error("Nota obrigatória");
        }

        if (!dados.usuarioId) {
            throw new Error("Usuário obrigatório");
        }

        if (!dados.livroId) {
            throw new Error("Livro obrigatório");
        }

        const livroExiste = 
            await this.livroRepository.buscarPorId(dados.livroId);
            
        if (!livroExiste) {
            throw new Error("Livro não encontrado");
        }


        const usuarioExiste =
            await this.usuarioRepository.buscarPorId(dados.usuarioId);

        if (!usuarioExiste) {
            throw new Error("Usuário não encontrado");
        }

        if (dados.nota < 0 || dados.nota > 5) {
            throw new Error("Nota inválida");
        }

        const avaliacaoExiste =
            await this.avaliacaoRepository.buscarPorUsuarioELivro(
                dados.usuarioId,
                dados.livroId
            );

        if (avaliacaoExiste) {
            throw new Error("Usuário já avaliou esse livro");
        }

        const novaAvaliacao = {
            livroId: dados.livroId,
            nota: dados.nota,
            descricao: dados.descricao,
            usuarioId: dados.usuarioId
        };
        return await this.avaliacaoRepository.criar(novaAvaliacao);
    }

    async listar() {

        const avaliacoes =
            await this.avaliacaoRepository.listar();

        return Promise.all(avaliacoes.map(async avaliacao => {

            const usuario =
                await this.usuarioRepository.buscarPorId(
                    avaliacao.usuarioId
                );

            const livro =
                await this.livroRepository.buscarPorId(
                    avaliacao.livroId
                );

            return {
                id: avaliacao.id,
                livro: livro?.nome,
                usuario: usuario?.nome,
                nota: avaliacao.nota,
                descricao: avaliacao.descricao
            };

        }));
    }

    async deletar(id, usuarioIdLogado, isAdmin) {
        // 1. Procurar a avaliação no banco para saber a quem ela pertence
        const avaliacao = await this.avaliacaoRepository.buscarPorId(id);

        if (!avaliacao) {
            throw new Error("Avaliação não encontrada");
        }

        // 2. A Trava de Permissões Cruzadas (A Regra de Ouro)
        // Se o utilizador logado NÃO for o dono da avaliação E também NÃO for administrador, o acesso é bloqueado.
        if (avaliacao.usuarioId !== usuarioIdLogado && !isAdmin) {
            throw new Error("Acesso negado: Apenas o autor ou um administrador podem remover esta avaliação.");
        }

        // 3. Se a execução chegar aqui, a pessoa é o dono ou é um admin. A exclusão é autorizada.
        return await this.avaliacaoRepository.deletar(id);
    }

}

module.exports = AvaliacaoService;