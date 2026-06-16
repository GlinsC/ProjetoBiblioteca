const express = require("express");
const { verificarToken } = require("../auth");

module.exports = (avaliacaoController) => {

    const router = express.Router();

    router.post("/", verificarToken, avaliacaoController.criar);
    router.get("/", verificarToken, avaliacaoController.listar);
    router.delete('/:id', verificarToken, avaliacaoController.deletar);

    return router;
};