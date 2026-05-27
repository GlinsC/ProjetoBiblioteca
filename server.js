const express = require("express");

const UsuarioRepository =
    require("./Repositories/UsuarioRepository");

const AvaliacaoRepository =
    require("./Repositories/AvaliacaoRepository");

const UsuarioService =
    require("./Service/UsuarioService");

const AvaliacaoService =
    require("./Service/AvaliacaoService");

const UsuarioController =
    require("./Controller/UsuarioController");

const AvaliacaoController =
    require("./Controller/AvaliacaoController");

const usuarioRoutes =
    require("./Router/usuarioRoutes");

const avaliacaoRoutes =
    require("./Router/avaliacaoRoutes");

const app = express();

app.use(express.json());

/*
    REPOSITORIES
*/

const usuarioRepository =
    new UsuarioRepository();

const avaliacaoRepository =
    new AvaliacaoRepository();

/*
    SERVICES
*/

const usuarioService =
    new UsuarioService(
        usuarioRepository,
        avaliacaoRepository
    );

const avaliacaoService =
    new AvaliacaoService(
        avaliacaoRepository,
        usuarioRepository
    );

/*
    CONTROLLERS
*/

const usuarioController =
    new UsuarioController(usuarioService);

const avaliacaoController =
    new AvaliacaoController(avaliacaoService);

/*
    ROUTES
*/

app.use(
    "/usuarios",
    usuarioRoutes(usuarioController)
);

app.use(
    "/avaliacoes",
    avaliacaoRoutes(avaliacaoController)
);

app.listen(3000, () => {
    console.log("Servidor rodando");
});