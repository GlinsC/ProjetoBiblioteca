const express = require("express");

module.exports = (usuarioController) => {

    const router = express.Router();

    router.post("/", usuarioController.criar);

    router.get("/", usuarioController.listar);

    router.get("/:id", usuarioController.buscarPorId);

    return router;
};