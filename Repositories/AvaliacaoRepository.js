const db = require("../database/memoryDatabase");

class AvaliacaoRepository {

    criar(avaliacao) {
        db.avaliacoes.push(avaliacao);
        return avaliacao;
    }

    listar() {
        return db.avaliacoes;
    }

    buscarPorUsuario(usuarioId) {
        return db.avaliacoes.filter(
            avaliacao => avaliacao.usuarioId === usuarioId
        );
    }

    buscarPorUsuarioELivro(usuarioId, livro) {
        return db.avaliacoes.find(
            avaliacao =>
                avaliacao.usuarioId === usuarioId &&
                avaliacao.livro === livro
        );
    }

}

module.exports = AvaliacaoRepository;