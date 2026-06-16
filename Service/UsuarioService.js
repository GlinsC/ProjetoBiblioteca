const bcrypt = require("bcryptjs");

class UsuarioService {

    constructor(
        usuarioRepository,
        avaliacaoRepository,
        livroRepository
    ) {
        this.usuarioRepository = usuarioRepository;
        this.avaliacaoRepository =
            avaliacaoRepository;
        this.livroRepository = livroRepository;
    }

    async criar(dados) {

        if (!dados.nome) {
            throw new Error("Nome obrigatório");
        }

        if (!dados.email) {
            throw new Error("Email obrigatório");
        }

        const senha = dados.senha || "123456";
        const senhaHash = await bcrypt.hash(senha, 10);

        const novoUsuario = {
            nome: dados.nome,
            email: dados.email,
            admin: false,
            senha: senhaHash
        };
        return await this.usuarioRepository.criar(
            novoUsuario
        );
    }

    async listar() {
        const usuarios = await this.usuarioRepository.listar();
        
        // Remove o campo 'senha' de todos os objetos antes de enviar para o front-end
        return usuarios.map(usuario => {
            const { senha, ...usuarioSeguro } = usuario;
            return usuarioSeguro;
        });
    }

    async buscarPorId(id) {

        const usuario =
            await this.usuarioRepository.buscarPorId(id);

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        const avaliacoes =
            await this.avaliacaoRepository
                .buscarPorUsuario(Number(id));

        const livrosLidos = await Promise.all(
            avaliacoes.map(async avaliacao => {
                const livro = await this.livroRepository.buscarPorId(avaliacao.livroId);

                return {
                    livro: livro?.nome || avaliacao.livroId,
                    nota: avaliacao.nota,
                    descricao: avaliacao.descricao
                };
            })
        );

        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            livrosLidos
        };
    }

    async login(dados) {

        if (!dados.email) {
            throw new Error("Email obrigatório");
        }

        if (!dados.senha) {
            throw new Error("Senha obrigatória");
        }

        const usuario = await this.usuarioRepository.buscarPorEmail(dados.email);

        if (!usuario || !usuario.senha) {
            throw new Error("Credenciais inválidas");
        }

        const senhaValida = bcrypt.compareSync(dados.senha, usuario.senha);

        if (!senhaValida) {
            throw new Error("Credenciais inválidas");
        }

        return usuario;
    }

    async alterarAdmin(id) {

        const usuario =
            await this.usuarioRepository.alterarAdmin(id);

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        return usuario;
    }

}

module.exports = UsuarioService;