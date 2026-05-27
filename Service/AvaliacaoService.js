let ID = 1
class AvaliacaoService {

    constructor(avaliacaoRepository, usuarioRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    criar(dados) {

        if (!dados.livro) {
            throw new Error("Livro obrigatório");
        }

        if (!dados.descricao) {
            throw new Error("Descrição obrigatória");
        }

        if (dados.nota === undefined) {
            throw new Error("Nota obrigatória");
        }

        if (!dados.usuarioId) {
            throw new Error("Usuário obrigatório");
        }


        const usuarioExiste =
            this.usuarioRepository.buscarPorId(dados.usuarioId);

        if (!usuarioExiste) {
            throw new Error("Usuário não encontrado");
        }

        if (dados.nota < 0 || dados.nota > 5) {
            throw new Error("Nota inválida");
        }

        const avaliacaoExiste =
            this.avaliacaoRepository.buscarPorUsuarioELivro(
                dados.usuarioId,
                dados.livro
            );

        if (avaliacaoExiste) {
            throw new Error("Usuário já avaliou esse livro");
        }

        const novaAvaliacao = {
            id: ID,
            livro: dados.livro,
            nota: dados.nota,
            descricao: dados.descricao,
            usuarioId: dados.usuarioId
        };
        ID++
        return this.avaliacaoRepository.criar(novaAvaliacao);
    }

    listar() {
        return this.avaliacaoRepository.listar();
    }


}

module.exports = AvaliacaoService;