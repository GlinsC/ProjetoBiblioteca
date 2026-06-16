const express = require("express");
const { verificarToken, exigirAdmin } = require("../auth");

module.exports = (livroController) => {

    const router = express.Router();

    router.post('/', verificarToken, exigirAdmin, livroController.criar);

    router.get("/", verificarToken, livroController.listar);

    router.get("/:id", verificarToken, livroController.buscarPorId);

    router.delete("/:id", verificarToken, exigirAdmin, livroController.deletar);

    return router;
};