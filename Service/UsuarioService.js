let ID = 1

class UsuarioService {

    constructor(
        usuarioRepository,
        avaliacaoRepository
    ) {
        this.usuarioRepository = usuarioRepository;
        this.avaliacaoRepository =
            avaliacaoRepository;
    }

    criar(dados) {

        if (!dados.nome) {
            throw new Error("Nome obrigatório");
        }

        if (!dados.email) {
            throw new Error("Email obrigatório");
        }

        const novoUsuario = {
            id: ID,
            nome: dados.nome,
            email: dados.email
        };
        ID++
        return this.usuarioRepository.criar(
            novoUsuario
        );
    }

    listar() {
        return this.usuarioRepository.listar();
    }

    buscarPorId(id) {

        const usuario =
            this.usuarioRepository.buscarPorId(id);

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        const avaliacoes =
            this.avaliacaoRepository
                .buscarPorUsuario(Number(id));

        const livrosLidos =
            avaliacoes.map(avaliacao => ({
                livro: avaliacao.livro,
                nota: avaliacao.nota,
                descricao: avaliacao.descricao
            }));

        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            livrosLidos
        };
    }

}

module.exports = UsuarioService;