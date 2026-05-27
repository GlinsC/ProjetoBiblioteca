class UsuarioController {

    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }

    criar = (req, res) => {

        try {

            const resultado =
                this.usuarioService.criar(req.body);

            return res.status(201).json(resultado);

        } catch (error) {

            return res.status(400).json({
                erro: error.message
            });

        }

    };

    listar = (req, res) => {

        const usuarios =
            this.usuarioService.listar();

        return res.json(usuarios);

    };

    buscarPorId = (req, res) => {

        try {

            const usuario =
                this.usuarioService.buscarPorId(
                    req.params.id
                );

            return res.json(usuario);

        } catch (error) {

            return res.status(404).json({
                erro: error.message
            });

        }

    };

}

module.exports = UsuarioController;