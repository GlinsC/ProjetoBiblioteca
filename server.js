require("./Database/initDatabase");

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

const webRouter =
    require("./Router/webRouter");

const LivroRepository =
    require("./Repositories/LivroRepository");

const LivroService =
    require("./Service/LivroService");

const LivroController =
    require("./Controller/LivroController");

const livroRoutes =
    require("./Router/livroRoutes");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));

/*
    REPOSITORIES
*/

const usuarioRepository =
    new UsuarioRepository();

const avaliacaoRepository =
    new AvaliacaoRepository();

const livroRepository =
    new LivroRepository();

/*
    SERVICES
*/

const usuarioService =
    new UsuarioService(
        usuarioRepository,
        avaliacaoRepository,
        livroRepository
    );

const avaliacaoService =
    new AvaliacaoService(
        avaliacaoRepository,
        usuarioRepository,
        livroRepository
    );


const livroService =
    new LivroService(
        livroRepository,
        usuarioRepository,
        avaliacaoRepository
    );
/*
    CONTROLLERS
*/

const usuarioController =
    new UsuarioController(usuarioService);

const avaliacaoController =
    new AvaliacaoController(avaliacaoService);

const livroController =
    new LivroController(
        livroService
    );

/*
    ROUTES
*/

app.use("/", webRouter);

app.use(
    "/api/usuarios",
    usuarioRoutes(usuarioController)
);

app.use(
    "/api/avaliacoes",
    avaliacaoRoutes(avaliacaoController)
);

app.use(
    "/api/livros",
    livroRoutes(livroController)
);

app.use("/painel", webRouter);

app.listen(3000, () => {
    console.log("Servidor rodando");
});