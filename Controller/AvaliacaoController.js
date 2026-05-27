class AvaliacaoController {

    constructor(avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    criar = (req, res) => {

        try {

            const resultado =
                this.avaliacaoService.criar(req.body);

            return res.status(201).json(resultado);

        } catch (error) {

            return res.status(400).json({
                erro: error.message
            });

        }

    };

    listar = (req, res) => {

        const resultado =
            this.avaliacaoService.listar();

        return res.json(resultado);

    };

}

module.exports = AvaliacaoController;