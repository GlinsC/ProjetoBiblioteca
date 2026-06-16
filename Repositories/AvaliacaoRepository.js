const db = require("../Database/dataBase");

class AvaliacaoRepository {

    async criar(avaliacao) {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO avaliacoes (usuarioId, livroId, nota, descricao) VALUES (?, ?, ?, ?)",
                [avaliacao.usuarioId, avaliacao.livroId ?? avaliacao.livro, avaliacao.nota, avaliacao.descricao],
                function (err) {
                    if (err) {
                        return reject(err);
                    }

                    resolve({
                        id: this.lastID,
                        ...avaliacao,
                        livroId: avaliacao.livroId ?? avaliacao.livro
                    });
                }
            );
        });
    }

    async listar() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM avaliacoes", (err, rows) => {
                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }

    async buscarPorUsuario(usuarioId) {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM avaliacoes WHERE usuarioId = ?", [usuarioId], (err, rows) => {
                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }

    async buscarPorUsuarioELivro(usuarioId, livroId) {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT * FROM avaliacoes WHERE usuarioId = ? AND livroId = ?",
                [usuarioId, livroId],
                (err, row) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(row || null);
                }
            );
        });
    }

    async buscarPorId(id) {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT * FROM avaliacoes WHERE id = ?",
                [id],
                (err, row) => {
                    if (err) {
                        return reject(err);
                    }
                    // Retorna a linha encontrada ou null se não existir
                    resolve(row || null);
                }
            );
        });
    }

    async deletar(id) {
        return new Promise((resolve, reject) => {
            db.run(
                "DELETE FROM avaliacoes WHERE id = ?",
                [id],
                function (err) {
                    if (err) {
                        return reject(err);
                    }
                    // this.changes retorna o número de linhas afetadas pelo DELETE
                    resolve(this.changes > 0);
                }
            );
        });
    }
}

module.exports = AvaliacaoRepository;