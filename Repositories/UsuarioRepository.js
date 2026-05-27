const db = require("../database/memoryDatabase");

class UsuarioRepository {

    criar(usuario) {
        db.usuarios.push(usuario);
        return usuario;
    }

    listar() {
        return db.usuarios;
    }

    buscarPorId(id) {
        return db.usuarios.find(
            usuario => usuario.id === Number(id)
        );
    }

}

module.exports = UsuarioRepository;