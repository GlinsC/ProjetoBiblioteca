class LivroService {

    constructor(
        livroRepository,
        usuarioRepository,
        avaliacaoRepository
    ) {

        this.livroRepository =
            livroRepository;

        this.usuarioRepository =
            usuarioRepository;

        this.avaliacaoRepository =
            avaliacaoRepository;
    }

    async criar(dados) {
        const usuario =
            await this.usuarioRepository.buscarPorId(
                dados.usuarioId
            );

        if (!usuario) {
            throw new Error(
                "Usuário não encontrado"
            );
        }

        if (!usuario.admin) {
            throw new Error(
                "Usuário não é administrador"
            );
        }

        const livroExiste = 
            await this.livroRepository.buscarPorDetalhes(
                dados.nome, 
                dados.autor, 
                dados.editora, 
                dados.genero
            );

        if (livroExiste) {
            throw new Error("Este livro já está cadastrado no sistema");
        }

        const novoLivro = {
            nome: dados.nome,
            autor: dados.autor,
            editora: dados.editora,
            genero: dados.genero
        };
        
        return await this.livroRepository.criar(novoLivro);
    }

    async listar() {
        return await this.livroRepository.listar();
    }

async deletar(id) {
        const livro = await this.livroRepository.buscarPorId(id);

        if (!livro) {
            throw new Error("Livro não encontrado para exclusão");
        }

        return await this.livroRepository.deletar(id);
    }

    async buscarPorId(id) {

        const livro =
            await this.livroRepository.buscarPorId(id);

        if (!livro) {
            throw new Error("Livro não encontrado");
        }

        const avaliacoes =
            (await this.avaliacaoRepository.listar())
                .filter(
                    avaliacao =>
                        avaliacao.livroId === Number(id)
                );

        return {
            ...livro,
            avaliacoes
        };
    }

}

module.exports = LivroService;