const express = require("express");

module.exports = (avaliacaoController) => {

    const router = express.Router();

    router.post("/", avaliacaoController.criar);
    router.get("/", avaliacaoController.listar);

    return router;
};